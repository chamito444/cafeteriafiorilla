<?php
// Cambia el estado de un pedido desde el programa de Windows. Requiere X-Api-Key.
require __DIR__ . '/config.php';
exigirApiKey();
limitarPeticiones('upd', 120, 60);

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Metodo no permitido']);
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    responder(400, ['ok' => false, 'error' => 'JSON invalido']);
}

$id      = (int) ($data['id'] ?? 0);
$estado  = array_key_exists('estado', $data) ? (string) $data['estado'] : null;
$minutos = array_key_exists('minutos_estimados', $data) ? $data['minutos_estimados'] : false;
$validos = ['nuevo', 'en_cola', 'preparando', 'listo', 'entregado', 'cancelado'];

if ($id <= 0) {
    responder(400, ['ok' => false, 'error' => 'Id invalido']);
}
if ($estado !== null && !in_array($estado, $validos, true)) {
    responder(400, ['ok' => false, 'error' => 'Estado invalido']);
}
if ($estado === null && $minutos === false) {
    responder(400, ['ok' => false, 'error' => 'Nada que actualizar']);
}

// Tiempo estimado: null lo borra, 1..240 lo fija
if ($minutos !== false && $minutos !== null) {
    $minutos = (int) $minutos;
    if ($minutos < 1 || $minutos > 240) {
        responder(400, ['ok' => false, 'error' => 'Tiempo estimado fuera de rango (1-240 min)']);
    }
}

try {
    $ahora = (new DateTimeImmutable('now', new DateTimeZone('America/Santiago')))->format('Y-m-d H:i:s');

    $sets = [];
    $args = [];

    if ($estado !== null) {
        $sets[] = 'estado = ?';
        $args[] = $estado;

        // Al entrar a la cola guardamos cuando, para ordenarla y estimar la espera
        if ($estado === 'en_cola') {
            $sets[] = 'encolado_en = COALESCE(encolado_en, ?)';
            $args[] = $ahora;
        }
    }
    if ($minutos !== false) {
        $sets[] = 'minutos_estimados = ?';
        $args[] = $minutos;
        $sets[] = 'estimado_en = ?';
        $args[] = $minutos === null ? null : $ahora;
    }

    $sets[] = 'actualizado_en = ?';
    $args[] = $ahora;
    $args[] = $id;

    $st = db()->prepare("UPDATE pedidos SET " . implode(', ', $sets) . " WHERE id = ?");
    $st->execute($args);

    if ($st->rowCount() === 0) {
        // Puede ser que no exista, o que ya estuviera en ese estado
        $chk = db()->prepare("SELECT estado FROM pedidos WHERE id = ?");
        $chk->execute([$id]);
        $actual = $chk->fetchColumn();
        if ($actual === false) {
            responder(404, ['ok' => false, 'error' => 'Pedido no encontrado']);
        }
    }

    responder(200, [
        'ok' => true,
        'id' => $id,
        'estado' => $estado,
        'minutos_estimados' => $minutos === false ? null : $minutos,
    ]);
} catch (Throwable $e) {
    error_log('[fiorella] actualizar_estado: ' . $e->getMessage());
    responder(500, ['ok' => false, 'error' => 'No se pudo actualizar']);
}
