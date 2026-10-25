<?php
// Consulta publica del estado de UN pedido, por folio.
// No requiere API key porque no expone datos personales: solo estado y totales.
// El nombre y telefono del cliente NUNCA se devuelven aqui.
require __DIR__ . '/config.php';

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Vary: Origin');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Endpoint publico: frenamos el barrido de folios por fuerza bruta
limitarPeticiones('est', 90, 60);

$folio = trim((string) ($_GET['folio'] ?? ''));

// Formato esperado: F-AAMMDD-NNNN
if (!preg_match('/^F-\d{6}-\d{4}$/', $folio)) {
    responder(400, ['ok' => false, 'error' => 'Folio invalido']);
}

try {
    $st = db()->prepare(
        "SELECT folio, estado, modo_entrega, mesa, total,
                minutos_estimados, estimado_en, encolado_en, creado_en, actualizado_en
         FROM pedidos WHERE folio = ? LIMIT 1"
    );
    $st->execute([$folio]);
    $pedido = $st->fetch();

    if (!$pedido) {
        responder(404, ['ok' => false, 'error' => 'No encontramos ese pedido']);
    }

    $st = db()->prepare(
        "SELECT i.nombre, i.cantidad, i.opciones
         FROM pedido_items i
         JOIN pedidos p ON p.id = i.pedido_id
         WHERE p.folio = ?
         ORDER BY i.id ASC"
    );
    $st->execute([$folio]);
    $items = $st->fetchAll();

    foreach ($items as &$i) {
        $i['cantidad'] = (int) $i['cantidad'];
    }
    unset($i);

    $pedido['total'] = (int) $pedido['total'];
    $pedido['mesa']  = $pedido['mesa'] === null ? null : (int) $pedido['mesa'];
    $pedido['minutos_estimados'] = $pedido['minutos_estimados'] === null
        ? null : (int) $pedido['minutos_estimados'];
    $pedido['items'] = $items;

    // Si esta en cola, cuantos tiene por delante
    if ($pedido['estado'] === 'en_cola' && $pedido['encolado_en']) {
        $st = db()->prepare(
            "SELECT COUNT(*) FROM pedidos
             WHERE estado = 'en_cola' AND encolado_en < ?"
        );
        $st->execute([$pedido['encolado_en']]);
        $pedido['en_cola_delante'] = (int) $st->fetchColumn();

        $enPrep = (int) db()->query(
            "SELECT COUNT(*) FROM pedidos WHERE estado = 'preparando'"
        )->fetchColumn();
        $pedido['hay_preparando'] = $enPrep > 0;
    }

    responder(200, ['ok' => true, 'pedido' => $pedido]);
} catch (Throwable $e) {
    error_log('[fiorella] estado_pedido: ' . $e->getMessage());
    responder(500, ['ok' => false, 'error' => 'Error al consultar']);
}
