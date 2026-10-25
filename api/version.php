<?php
// Manifiesto de actualizaciones. Publico a proposito: solo dice que version
// es la ultima, donde bajarla y su huella. No expone nada del negocio.
//
// Se sirve por PHP porque el .htaccess de la carpeta padre bloquea los .json.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$archivo = __DIR__ . '/actualizacion.json';

if (!is_readable($archivo)) {
    http_response_code(404);
    echo json_encode(['error' => 'sin manifiesto']);
    exit;
}

$datos = json_decode((string) file_get_contents($archivo), true);
if (!is_array($datos)) {
    http_response_code(500);
    echo json_encode(['error' => 'manifiesto invalido']);
    exit;
}

echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
