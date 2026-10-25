function saludar(nombre) {
  if (!nombre || nombre.trim() === '') {
    throw new Error('El nombre no puede estar vacío');
  }
  return `¡Hola, ${nombre}! Bienvenido al mundo de CI/CD con GitHub Actions 🚀`;
}

function obtenerFecha() {
  return new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

module.exports = { saludar, obtenerFecha };

// Solo ejecutar si se llama directamente (node app.js)
if (require.main === module) {
  console.log(saludar('Mundo'));
  console.log(`Fecha de ejecución: ${obtenerFecha()}`);
}