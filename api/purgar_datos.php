<?php
// Minimizacion de datos personales.
//
// Los pedidos entregados de mas de N dias conservan el historial comercial
// (folio, productos, total) pero pierden nombre, telefono, IP y coordenadas.
// Asi el local sigue teniendo sus ventas y nosotros dejamos de guardar datos
// de personas que ya no necesitamos.
//
// Pensado para correrse desde un cron diario. Requiere clave de admin.
require __DIR__ . '/config.php';

// Por HTTP exige clave de admin. Por linea de comandos (cron) no hay cabeceras,
// y llegar al CLI ya implica tener acceso al servidor.
if (PHP_SAPI !== 'cli') {
    exigirClaveAdmin();
}

const DIAS_RETENCION = 30;

try {
    $st = db()->prepare(
        "UPDATE pedidos
            SET cliente = '', telefono = '', ip = '', lat = NULL, lon = NULL
          WHERE estado IN ('entregado','cancelado')
            AND creado_en < (NOW() - INTERVAL ? DAY)
            AND (cliente <> '' OR telefono <> '' OR ip <> '' OR lat IS NOT NULL)"
    );
    $st->execute([DIAS_RETENCION]);

    responder(200, [
        'ok' => true,
        'anonimizados' => $st->rowCount(),
        'retencion_dias' => DIAS_RETENCION,
    ]);
} catch (Throwable $e) {
    error_log('[fiorella] purgar_datos: ' . $e->getMessage());
    responder(500, ['ok' => false, 'error' => 'Error al purgar']);
}
