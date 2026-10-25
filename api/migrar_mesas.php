<?php
// Agrega las columnas de mesa y tiempo estimado. Idempotente: se puede repetir.
require __DIR__ . '/config.php';
exigirClaveAdmin();  // mantenimiento: la clave del panel NO sirve aqui

try {
    $pdo = db();
    $hechos = [];

    $columnas = $pdo->query("SHOW COLUMNS FROM pedidos")->fetchAll(PDO::FETCH_COLUMN);

    if (!in_array('mesa', $columnas, true)) {
        $pdo->exec("ALTER TABLE pedidos ADD COLUMN mesa TINYINT UNSIGNED NULL DEFAULT NULL AFTER modo_entrega");
        $pdo->exec("ALTER TABLE pedidos ADD INDEX idx_mesa (mesa)");
        $hechos[] = 'columna mesa agregada';
    }

    if (!in_array('minutos_estimados', $columnas, true)) {
        $pdo->exec("ALTER TABLE pedidos ADD COLUMN minutos_estimados SMALLINT UNSIGNED NULL DEFAULT NULL AFTER estado");
        $hechos[] = 'columna minutos_estimados agregada';
    }

    if (!in_array('estimado_en', $columnas, true)) {
        $pdo->exec("ALTER TABLE pedidos ADD COLUMN estimado_en DATETIME NULL DEFAULT NULL AFTER minutos_estimados");
        $hechos[] = 'columna estimado_en agregada';
    }

    // El nombre del cliente deja de ser obligatorio en pedidos de mesa
    $pdo->exec("ALTER TABLE pedidos MODIFY cliente VARCHAR(120) NOT NULL DEFAULT ''");

    responder(200, [
        'ok' => true,
        'cambios' => $hechos ?: ['sin cambios, ya estaba migrada'],
        'columnas' => $pdo->query("SHOW COLUMNS FROM pedidos")->fetchAll(PDO::FETCH_COLUMN),
    ]);
} catch (Throwable $e) {
    responder(500, ['ok' => false, 'error' => $e->getMessage()]);
}
