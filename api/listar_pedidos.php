<?php
// Lo consume el programa de Windows. Requiere X-Api-Key.
require __DIR__ . '/config.php';
exigirApiKey();
// El panel consulta cada 5s: 60/min deja margen de sobra y frena abusos.
limitarPeticiones('list', 60, 60);

$desdeId = isset($_GET['desde_id']) ? max(0, (int) $_GET['desde_id']) : 0;
$limite  = isset($_GET['limite'])   ? (int) $_GET['limite'] : 100;
$limite  = max(1, min(500, $limite));
$estado  = $_GET['estado'] ?? '';

$validos = ['nuevo', 'en_cola', 'preparando', 'listo', 'entregado', 'cancelado'];
$where   = ['p.id > ?'];
$args    = [$desdeId];

if ($estado !== '' && in_array($estado, $validos, true)) {
    $where[] = 'p.estado = ?';
    $args[]  = $estado;
}

// 'activos' = todo lo que aun requiere accion en el local
if ($estado === 'activos') {
    $where[] = "p.estado IN ('nuevo','en_cola','preparando','listo')";
}

try {
    $pdo = db();

    $sql = "SELECT p.id, p.folio, p.cliente, p.telefono, p.modo_entrega, p.mesa, p.nota,
                   p.total, p.estado, p.minutos_estimados, p.estimado_en,
                   p.geo_estado, p.distancia_m, p.precision_m, p.encolado_en,
                   p.creado_en, p.actualizado_en
            FROM pedidos p
            WHERE " . implode(' AND ', $where) . "
            ORDER BY p.id DESC
            LIMIT " . $limite;

    $st = $pdo->prepare($sql);
    $st->execute($args);
    $pedidos = $st->fetchAll();

    if ($pedidos) {
        $ids = array_column($pedidos, 'id');
        $ph  = implode(',', array_fill(0, count($ids), '?'));

        $st = $pdo->prepare(
            "SELECT pedido_id, nombre, cantidad, precio_unit, subtotal, opciones, nota
             FROM pedido_items
             WHERE pedido_id IN ($ph)
             ORDER BY id ASC"
        );
        $st->execute($ids);

        $porPedido = [];
        foreach ($st->fetchAll() as $item) {
            $pid = (int) $item['pedido_id'];
            unset($item['pedido_id']);
            $item['cantidad']    = (int) $item['cantidad'];
            $item['precio_unit'] = (int) $item['precio_unit'];
            $item['subtotal']    = (int) $item['subtotal'];
            $porPedido[$pid][]   = $item;
        }

        foreach ($pedidos as &$p) {
            $p['id']    = (int) $p['id'];
            $p['total'] = (int) $p['total'];
            $p['mesa']  = $p['mesa'] === null ? null : (int) $p['mesa'];
            $p['minutos_estimados'] = $p['minutos_estimados'] === null ? null : (int) $p['minutos_estimados'];
            $p['distancia_m'] = $p['distancia_m'] === null ? null : (int) $p['distancia_m'];
            $p['items'] = $porPedido[$p['id']] ?? [];
        }
        unset($p);
    }

    $maxId = (int) $pdo->query("SELECT COALESCE(MAX(id), 0) FROM pedidos")->fetchColumn();

    responder(200, [
        'ok'          => true,
        'pedidos'     => $pedidos,
        'ultimo_id'   => $maxId,
        'servidor_ts' => (new DateTimeImmutable('now', new DateTimeZone('America/Santiago')))->format('c'),
    ]);
} catch (Throwable $e) {
    error_log('[fiorella] listar_pedidos: ' . $e->getMessage());
    responder(500, ['ok' => false, 'error' => 'Error al leer pedidos']);
}
