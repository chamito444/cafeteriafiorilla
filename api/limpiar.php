<?php
// Script de limpieza de datos de prueba. Ya se ejecuto y quedo deshabilitado
// a proposito: borraba filas de la tabla pedidos.
http_response_code(410);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => false, 'error' => 'Script deshabilitado']);
