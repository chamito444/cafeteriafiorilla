<?php
// Recibe el pedido desde la web publica. No requiere API key (lo usa el cliente).
require __DIR__ . '/config.php';

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Vary: Origin');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Metodo no permitido']);
}

$crudo = file_get_contents('php://input');
if ($crudo === false || strlen($crudo) > 120000) {
    responder(413, ['ok' => false, 'error' => 'Pedido demasiado grande']);
}

$data = json_decode($crudo, true);
if (!is_array($data)) {
    responder(400, ['ok' => false, 'error' => 'JSON invalido']);
}

$items = $data['items'] ?? null;
if (!is_array($items) || count($items) === 0) {
    responder(400, ['ok' => false, 'error' => 'El pedido no tiene productos']);
}
if (count($items) > MAX_ITEMS_POR_PEDIDO) {
    responder(400, ['ok' => false, 'error' => 'Demasiados productos en el pedido']);
}

$limpiar = static function ($v, int $max): string {
    if (!is_scalar($v)) return '';
    $s = trim((string) $v);
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    return mb_substr($s, 0, $max, 'UTF-8');
};

// Mesa: 1..TOTAL_MESAS. Si viene mesa, el pedido es en mesa y no pide datos.
$mesa = $data['mesa'] ?? null;
if ($mesa !== null && $mesa !== '') {
    $mesa = (int) $mesa;
    if ($mesa < 1 || $mesa > TOTAL_MESAS) {
        responder(400, ['ok' => false, 'error' => 'Numero de mesa invalido']);
    }
} else {
    $mesa = null;
}

// ---------------------------------------------------------------------------
// GEOCERCO
// Solo aplica a pedidos de mesa: para retiro el cliente puede estar donde sea.
// ---------------------------------------------------------------------------
$lat = $lon = $precisionM = $distanciaM = null;
$geoEstado = 'sin_verificar';

$ubic = $data['ubicacion'] ?? null;
if (is_array($ubic) && isset($ubic['lat'], $ubic['lon'])) {
    $latRaw = filter_var($ubic['lat'], FILTER_VALIDATE_FLOAT);
    $lonRaw = filter_var($ubic['lon'], FILTER_VALIDATE_FLOAT);

    if ($latRaw !== false && $lonRaw !== false
        && $latRaw >= -90 && $latRaw <= 90
        && $lonRaw >= -180 && $lonRaw <= 180) {
        $lat = $latRaw;
        $lon = $lonRaw;

        $p = filter_var($ubic['precision'] ?? null, FILTER_VALIDATE_FLOAT);
        if ($p !== false && $p >= 0) {
            $precisionM = (int) min($p, 65535);
        }
    }
}

if ($mesa !== null && geocercoActivo()) {
    if ($lat !== null) {
        $distanciaM = (int) round(distanciaMetros(LOCAL_LAT, LOCAL_LON, $lat, $lon));

        // Le damos al cliente el beneficio de su margen de error: si el GPS
        // dice "estoy a 180 m con 90 m de error", puede estar de verdad a 90 m.
        $margen = ($precisionM !== null && $precisionM <= PRECISION_MAXIMA_CONFIABLE)
            ? $precisionM : 0;

        if ($distanciaM - $margen <= RADIO_METROS) {
            $geoEstado = 'verificada';
        } elseif ($precisionM !== null && $precisionM > PRECISION_MAXIMA_CONFIABLE) {
            // Lectura demasiado imprecisa para rechazar con confianza
            $geoEstado = 'sin_verificar';
        } else {
            $geoEstado = 'lejos';
            responder(403, [
                'ok' => false,
                'error' => 'Parece que no estas en el local. Los pedidos por mesa solo se '
                         . 'pueden hacer desde la cafeteria.',
                'motivo' => 'fuera_de_rango',
                'distancia_m' => $distanciaM,
            ]);
        }
    } elseif (!ACEPTAR_SIN_UBICACION) {
        responder(403, [
            'ok' => false,
            'error' => 'Necesitamos tu ubicacion para tomar pedidos por mesa. '
                     . 'Activa el permiso de ubicacion y reintenta.',
            'motivo' => 'sin_ubicacion',
        ]);
    }
}

$cliente  = $limpiar($data['cliente']  ?? '', 120);
$telefono = $limpiar($data['telefono'] ?? '', 40);
$modo     = $limpiar($data['modo']     ?? '', 40);

// La mesa manda: si el pedido viene de un QR de mesa, el modo es siempre en mesa
if ($mesa !== null) {
    $modo = 'Mesa ' . $mesa;
}
$nota     = $limpiar($data['nota']     ?? '', 1000);

// Normaliza y recalcula el total en el servidor (nunca confiar en el total del cliente)
$normalizados = [];
$total = 0;
foreach ($items as $it) {
    if (!is_array($it)) continue;

    $nombre = $limpiar($it['nombre'] ?? '', 160);
    if ($nombre === '') continue;

    $cantidad = (int) ($it['cantidad'] ?? 0);
    if ($cantidad < 1)   $cantidad = 1;
    if ($cantidad > 999) $cantidad = 999;

    $precio = (int) ($it['precio_unit'] ?? 0);
    if ($precio < 0)       $precio = 0;
    if ($precio > 10000000) $precio = 10000000;

    $subtotal = $cantidad * $precio;
    $total   += $subtotal;

    $opciones = $it['opciones'] ?? '';
    if (is_array($opciones)) {
        $opciones = implode(' | ', array_map('strval', $opciones));
    }

    $normalizados[] = [
        'producto_id' => $limpiar($it['producto_id'] ?? '', 120),
        'nombre'      => $nombre,
        'cantidad'    => $cantidad,
        'precio_unit' => $precio,
        'subtotal'    => $subtotal,
        'opciones'    => $limpiar($opciones, 400),
        'nota'        => $limpiar($it['nota'] ?? '', 400),
    ];
}

if (count($normalizados) === 0) {
    responder(400, ['ok' => false, 'error' => 'El pedido no tiene productos validos']);
}

$ip    = ipCliente();
$ahora = (new DateTimeImmutable('now', new DateTimeZone('America/Santiago')))->format('Y-m-d H:i:s');

try {
    $pdo = db();

    // Rate limit simple por IP
    $st = $pdo->prepare(
        "SELECT COUNT(*) FROM pedidos WHERE ip = ? AND creado_en >= (NOW() - INTERVAL 1 HOUR)"
    );
    $st->execute([$ip]);
    if ((int) $st->fetchColumn() >= MAX_PEDIDOS_POR_IP_HORA) {
        responder(429, ['ok' => false, 'error' => 'Demasiados pedidos seguidos. Intenta en unos minutos.']);
    }

    $pdo->beginTransaction();

    // Folio legible: F-AAMMDD-#### (correlativo del dia)
    $hoy = substr($ahora, 0, 10);
    $st  = $pdo->prepare("SELECT COUNT(*) FROM pedidos WHERE DATE(creado_en) = ?");
    $st->execute([$hoy]);
    $correlativo = (int) $st->fetchColumn() + 1;
    $folio = 'F-' . date('ymd', strtotime($hoy)) . '-' . str_pad((string) $correlativo, 4, '0', STR_PAD_LEFT);

    $st = $pdo->prepare(
        "INSERT INTO pedidos
            (folio, cliente, telefono, modo_entrega, mesa, nota, total, estado,
             lat, lon, precision_m, distancia_m, geo_estado, creado_en, actualizado_en, ip)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'nuevo', ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $st->execute([
        $folio, $cliente, $telefono, $modo, $mesa, $nota, $total,
        $lat, $lon, $precisionM, $distanciaM, $geoEstado,
        $ahora, $ahora, $ip,
    ]);
    $pedidoId = (int) $pdo->lastInsertId();

    $st = $pdo->prepare(
        "INSERT INTO pedido_items
            (pedido_id, producto_id, nombre, cantidad, precio_unit, subtotal, opciones, nota)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    foreach ($normalizados as $it) {
        $st->execute([
            $pedidoId, $it['producto_id'], $it['nombre'], $it['cantidad'],
            $it['precio_unit'], $it['subtotal'], $it['opciones'], $it['nota'],
        ]);
    }

    $pdo->commit();

    responder(201, [
        'ok'    => true,
        'folio' => $folio,
        'total' => $total,
        'mesa'  => $mesa,
        'geo'   => $geoEstado,
        'mensaje' => 'Pedido recibido',
    ]);
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('[fiorella] crear_pedido: ' . $e->getMessage());
    responder(500, ['ok' => false, 'error' => 'No pudimos registrar el pedido']);
}
