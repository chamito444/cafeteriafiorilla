<?php
// Agrega las columnas de geolocalizacion. Idempotente.
require __DIR__ . '/config.php';
exigirClaveAdmin();  // mantenimiento: la clave del panel NO sirve aqui

try {
    $pdo = db();
    $hechos = [];
    $columnas = $pdo->query("SHOW COLUMNS FROM pedidos")->fetchAll(PDO::FETCH_COLUMN);

    $nuevas = [
        'lat'          => "DECIMAL(10,7) NULL DEFAULT NULL",
        'lon'          => "DECIMAL(10,7) NULL DEFAULT NULL",
        'precision_m'  => "SMALLINT UNSIGNED NULL DEFAULT NULL",
        'distancia_m'  => "MEDIUMINT UNSIGNED NULL DEFAULT NULL",
        'geo_estado'   => "ENUM('verificada','sin_verificar','lejos') NOT NULL DEFAULT 'sin_verificar'",
    ];

    foreach ($nuevas as $col => $tipo) {
        if (!in_array($col, $columnas, true)) {
            $pdo->exec("ALTER TABLE pedidos ADD COLUMN `$col` $tipo");
            $hechos[] = "columna $col agregada";
        }
    }

    responder(200, [
        'ok' => true,
        'cambios' => $hechos ?: ['sin cambios, ya estaba migrada'],
    ]);
} catch (Throwable $e) {
    responder(500, ['ok' => false, 'error' => $e->getMessage()]);
}
