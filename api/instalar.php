<?php
// Crea las tablas. Requiere X-Api-Key. Es idempotente: se puede correr varias veces.
require __DIR__ . '/config.php';
exigirClaveAdmin();  // mantenimiento: la clave del panel NO sirve aqui

$sql = [];

$sql[] = "CREATE TABLE IF NOT EXISTS pedidos (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    folio           VARCHAR(20)  NOT NULL,
    cliente         VARCHAR(120) NOT NULL DEFAULT '',
    telefono        VARCHAR(40)  NOT NULL DEFAULT '',
    modo_entrega    VARCHAR(40)  NOT NULL DEFAULT '',
    nota            TEXT         NULL,
    total           INT UNSIGNED NOT NULL DEFAULT 0,
    estado          ENUM('nuevo','preparando','listo','entregado','cancelado') NOT NULL DEFAULT 'nuevo',
    creado_en       DATETIME     NOT NULL,
    actualizado_en  DATETIME     NOT NULL,
    ip              VARCHAR(45)  NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY uq_folio (folio),
    KEY idx_estado_creado (estado, creado_en),
    KEY idx_creado (creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

$sql[] = "CREATE TABLE IF NOT EXISTS pedido_items (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    pedido_id    INT UNSIGNED NOT NULL,
    producto_id  VARCHAR(120) NOT NULL DEFAULT '',
    nombre       VARCHAR(160) NOT NULL,
    cantidad     SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    precio_unit  INT UNSIGNED NOT NULL DEFAULT 0,
    subtotal     INT UNSIGNED NOT NULL DEFAULT 0,
    opciones     VARCHAR(400) NOT NULL DEFAULT '',
    nota         VARCHAR(400) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    KEY idx_pedido (pedido_id),
    CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id)
        REFERENCES pedidos (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

try {
    $pdo = db();
    foreach ($sql as $q) {
        $pdo->exec($q);
    }
    $tablas = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    responder(200, ['ok' => true, 'mensaje' => 'Tablas listas', 'tablas' => $tablas]);
} catch (Throwable $e) {
    responder(500, ['ok' => false, 'error' => $e->getMessage()]);
}
