<?php
// Configuracion API de pedidos - Fiorella Heladeria & Cafeteria
// Este archivo NO debe servirse como texto plano. Ver .htaccess de esta carpeta.

const DB_HOST = 'localhost';
const DB_NAME = 'u895135002_fiorella';
const DB_USER = 'u895135002_fiorella';
const DB_PASS = 'DppZVHmr6M4gSHLjwZznX7qN';

// ---------------------------------------------------------------------------
// CLAVES DE ACCESO
//
// Dos niveles a proposito:
//
//   PANEL  -> lee pedidos y cambia estados. Es la que vive en el PC del local.
//             Se puede extraer de ahi, asi que NO debe poder hacer nada mas.
//   ADMIN  -> migraciones y mantenimiento. NUNCA sale de tu poder.
//
// Para revocar el acceso de un local, borra su linea de CLAVES_PANEL.
// Cada local debe tener su propia clave: asi revocas uno sin afectar al resto.
// ---------------------------------------------------------------------------
const CLAVES_PANEL = [
    'fiorella-maipu' => 'WX5tFjweEqbF55NAsO4HBsiFa4EU9Aggq3OeaWoVkZVO',
];

const CLAVE_ADMIN = 'r4bSP1MSqh0R1zy1gDvcULpFAUc8HOyg79gbszWmQ0kK';

// Origen permitido para el formulario web
const ALLOWED_ORIGIN = 'https://hmmcode.cl';

// Mesas del local. Cada una tiene su QR.
const TOTAL_MESAS = 7;

// ---------------------------------------------------------------------------
// GEOCERCO: solo se aceptan pedidos de mesa hechos cerca del local.
//
// Mientras LOCAL_LAT / LOCAL_LON sean null el geocerco esta APAGADO y todos los
// pedidos entran marcados como 'sin_verificar'. Para activarlo, pon aqui las
// coordenadas medidas dentro del local con ubicacion.html.
//
// OJO: la ubicacion la reporta el navegador del cliente y se puede falsear.
// Esto es un disuasivo, no un control de seguridad.
// ---------------------------------------------------------------------------
const LOCAL_LAT = null;
const LOCAL_LON = null;

// Radio de tolerancia en metros. Generoso a proposito: el GPS bajo techo
// suele tener 20-100 m de error y un radio chico rechaza clientes reales.
const RADIO_METROS = 150;

// Si el cliente niega el permiso o su GPS falla: aceptamos el pedido pero
// marcado, para que el local decida. Ponlo en false para rechazarlos.
const ACEPTAR_SIN_UBICACION = true;

// Lecturas con precision peor que esto no se consideran confiables para
// rechazar: se aceptan marcadas en vez de bloquear a un cliente real.
const PRECISION_MAXIMA_CONFIABLE = 200;

// Limites anti-abuso
const MAX_ITEMS_POR_PEDIDO = 60;
const MAX_PEDIDOS_POR_IP_HORA = 20;

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}

function responder(int $codigo, array $data): void
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Exige una clave de panel valida. Devuelve el nombre del local.
 * Compara con hash_equals para no filtrar informacion por el tiempo de respuesta.
 */
function exigirApiKey(): string
{
    $enviada = $_SERVER['HTTP_X_API_KEY'] ?? '';
    if (!is_string($enviada) || $enviada === '') {
        dormirAntiFuerzaBruta();
        responder(401, ['ok' => false, 'error' => 'No autorizado']);
    }

    foreach (CLAVES_PANEL as $local => $clave) {
        if (hash_equals($clave, $enviada)) {
            return $local;
        }
    }

    dormirAntiFuerzaBruta();
    responder(401, ['ok' => false, 'error' => 'No autorizado']);
}

/**
 * Solo para mantenimiento (migraciones). La clave de panel NO sirve aqui.
 */
function exigirClaveAdmin(): void
{
    $enviada = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
    if (!is_string($enviada) || !hash_equals(CLAVE_ADMIN, $enviada)) {
        dormirAntiFuerzaBruta();
        responder(404, ['ok' => false, 'error' => 'No encontrado']);
    }
}

/**
 * Frena el probado masivo de claves. Barato para el usuario legitimo
 * (falla una vez), caro para quien prueba miles.
 */
function dormirAntiFuerzaBruta(): void
{
    usleep(random_int(400000, 900000));
}

/**
 * Distancia en metros entre dos puntos (formula de haversine).
 */
function distanciaMetros(float $lat1, float $lon1, float $lat2, float $lon2): float
{
    $R = 6371000.0; // radio terrestre en metros
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a = sin($dLat / 2) ** 2
       + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) ** 2;

    return $R * 2 * atan2(sqrt($a), sqrt(1 - $a));
}

function geocercoActivo(): bool
{
    return LOCAL_LAT !== null && LOCAL_LON !== null;
}

/**
 * Limite simple por IP usando archivos temporales. Protege los endpoints
 * autenticados de que alguien con la clave (o probandola) sature el servidor.
 */
function limitarPeticiones(string $balde, int $maximo, int $ventanaSeg): void
{
    $archivo = sys_get_temp_dir() . '/fio_' . $balde . '_' . md5(ipCliente()) . '.txt';
    $ahora   = time();
    $marcas  = [];

    if (is_readable($archivo)) {
        $crudo  = @file_get_contents($archivo);
        $marcas = array_filter(
            array_map('intval', explode(',', (string) $crudo)),
            fn($t) => $t > $ahora - $ventanaSeg
        );
    }

    if (count($marcas) >= $maximo) {
        header('Retry-After: ' . $ventanaSeg);
        responder(429, ['ok' => false, 'error' => 'Demasiadas peticiones']);
    }

    $marcas[] = $ahora;
    @file_put_contents($archivo, implode(',', $marcas), LOCK_EX);
}

function ipCliente(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    return substr($ip, 0, 45);
}
