const fs = require('fs');
const path = require('path');

const rutaMascotas = path.join(__dirname, '..', 'datos', 'mascotas.json');

function cargarMascotasIniciales() {
  try {
    const data = fs.readFileSync(rutaMascotas, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error al leer los datos iniciales de mascotas: ${error.message}`);
  }
}

module.exports = {
  cargarMascotasIniciales
};