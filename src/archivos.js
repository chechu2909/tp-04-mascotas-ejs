const fs = require('fs').promises;
const path = require('path');

const rutaMascotas = path.join(__dirname, '..', 'datos', 'mascotas.json');

async function cargarMascotasIniciales() {
  try {
    const data = await fs.readFile(rutaMascotas, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error al leer los datos iniciales de mascotas: ${error.message}`);
  }
}

module.exports = {
  cargarMascotasIniciales
};