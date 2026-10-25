<?php
// Agrega el estado 'en_cola' y el momento en que el pedido entro a la cola.
// Idempotente.
require __DIR__ . '/config.php';
exigirClaveAdmin();  // mantenimiento: la clave del panel NO sirve aqui

try {
    $pdo = db();
    $hechos = [];

    // 1) Ampliar el enum de estados
    $col = $pdo->query("SHOW COLUMNS FROM pedidos LIKE 'estado'")->fetch();
    if ($col && stripos($col['Type'], 'en_cola') === false) {
        $pdo->exec(
            "ALTER TABLE pedidos MODIFY estado
             ENUM('nuevo','en_cola','preparando','listo','entregado','cancelado')
             NOT NULL DEFAULT 'nuevo'"
        );
        $hechos[] = "estado 'en_cola' agregado";
    }

    // 2) Cuando entro a la cola, para ordenarla y estimar la espera
    $columnas = $pdo->query("SHOW COLUMNS FROM pedidos")->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('encolado_en', $columnas, true)) {
        $pdo->exec("ALTER TABLE pedidos ADD COLUMN encolado_en DATETIME NULL DEFAULT NULL AFTER estimado_en");
        $hechos[] = 'columna encolado_en agregada';
    }

    responder(200, [
        'ok' => true,
        'cambios' => $hechos ?: ['sin cambios, ya estaba migrada'],
        'estados' => $pdo->query("SHOW COLUMNS FROM pedidos LIKE 'estado'")->fetch()['Type'],
    ]);
} catch (Throwable $e) {
    responder(500, ['ok' => false, 'error' => $e->getMessage()]);
}
