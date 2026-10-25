

const { saludar, despedir, obtenerFecha } = require('./app');

// --- Tests de la función saludar() ---

test('saludar() retorna el mensaje correcto con un nombre válido', () => {
  const resultado = saludar('María');
  expect(resultado).toBe('¡Hola, María! Bienvenido al mundo de CI/CD con GitHub Actions 🚀');
});

test('saludar() funciona con cualquier nombre', () => {
  const resultado = saludar('DevOps');
  expect(resultado).toContain('DevOps');
});

test('saludar() lanza un error si el nombre está vacío', () => {
  expect(() => saludar('')).toThrow('El nombre no puede estar vacío');
});

test('saludar() lanza un error si el nombre es solo espacios', () => {
  expect(() => saludar('   ')).toThrow('El nombre no puede estar vacío');
});

test('despedir() retorna el mensaje correcto', () => {
  const resultado = despedir('Carlos');
  expect(resultado).toBe('¡Hasta luego, Carlos! Recuerda: haz commit frecuente 👋');
});

test('despedir() lanza un error si el nombre está vacío', () => {
  expect(() => despedir('')).toThrow('El nombre no puede estar vacío');
});

// --- Tests de la función obtenerFecha() ---

test('obtenerFecha() retorna una cadena de texto (string)', () => {
  const fecha = obtenerFecha();
  expect(typeof fecha).toBe('string');
});

test('obtenerFecha() no retorna un valor vacío', () => {
  const fecha = obtenerFecha();
  expect(fecha.length).toBeGreaterThan(0);
});