const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

// Obtén las rutas absolutas de los archivos
const envExamplePath = path.resolve(__dirname, '.env.example');
const envPath = path.resolve(__dirname, '.env');

console.log('Ruta esperada para .env.example:', envExamplePath);
console.log('Ruta esperada para .env:', envPath);

// Verifica si .env.example existe
if (!fs.existsSync(envExamplePath)) {
  console.error(`Error: El archivo .env.example no existe en la ruta especificada: ${envExamplePath}`);
  console.error('Sugerencia: Asegúrate de que el archivo tiene el nombre correcto y no tiene extensiones adicionales.');
  process.exit(1);
}

// Intenta copiar el archivo
if (shell.cp(envExamplePath, envPath).code !== 0) {
  console.error('Error: No se pudo copiar .env.example a .env');
  process.exit(1);
}

console.log('.env creado correctamente a partir de .env.example');
