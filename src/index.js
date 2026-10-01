const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const { cargarMascotasIniciales } = require('./archivos');

const app = express();
const PORT = process.env.PORT || 3000;

// Carga inicial de datos en memoria temporal (Arreglo mutable)
let mascotasMemoria = [];

// Configuración de EJS y Layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middlewares obligatorios
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false })); // Lectura de formularios POST

// 1. GET / - Página inicial
app.get('/', (req, res) => {
  res.render('inicio', { title: 'Inicio - Refugio de Mascotas' });
});

// 2. GET /mascotas - Listado
app.get('/mascotas', (req, res) => {
  const especieFiltro = req.query.especie;
  let mascotas = mascotasMemoria;

  if (especieFiltro) {
    mascotas = mascotasMemoria.filter(
      (m) => m.especie && m.especie.toLowerCase() === especieFiltro.toLowerCase()
    );
  }

  res.render('mascotas/lista', {
    title: 'Nuestras Mascotas',
    mascotas,
    especieSeleccionada: especieFiltro || ''
  });
});

// 3. GET /mascotas/nueva - Formulario
app.get('/mascotas/nueva', (req, res) => {
  res.render('mascotas/nueva', {
    title: 'Registrar Mascota',
    error: null,
    datos: {}
  });
});

// 4. GET /mascotas/:id - Detalle
app.get('/mascotas/:id', (req, res) => {
  const idParam = parseInt(req.params.id, 10);
  const mascota = mascotasMemoria.find((m) => m.id === idParam);

  if (!mascota) {
    return res.status(404).render('no-encontrado', { title: 'Mascota No Encontrada' });
  }

  res.render('mascotas/detalle', {
    title: `${mascota.nombre} - Detalle`,
    mascota
  });
});

// 5. POST /mascotas - Procesar formulario de nueva mascota con validación de estado
app.post('/mascotas', (req, res) => {
  const { nombre, especie, edad, estado, descripcion } = req.body;
  const edadNumero = parseInt(edad, 10);

  // Lista blanca de estados permitidos
  const estadosPermitidos = ['En adopción', 'Adoptada', 'Reservada'];

  // Validación estricta de campos, edad y estado
  if (
    !nombre || 
    !especie || 
    edad === '' || 
    isNaN(edadNumero) || 
    edadNumero < 0 || 
    !estado || 
    !estadosPermitidos.includes(estado.trim()) ||
    !descripcion
  ) {
    return res.status(400).render('mascotas/nueva', {
      title: 'Registrar Mascota',
      error: 'Todos los campos son obligatorios, la edad debe ser mayor o igual a cero y el estado debe ser válido.',
      datos: { nombre, especie, edad, estado, descripcion }
    });
  }

  // Generar un ID numérico correlativo
  const nuevoId = mascotasMemoria.length > 0 ? Math.max(...mascotasMemoria.map(m => m.id)) + 1 : 1;

  const nuevaMascota = {
    id: nuevoId,
    nombre: nombre.trim(),
    especie: especie.trim(),
    edad: edadNumero,
    estado: estado.trim(),
    descripcion: descripcion.trim(),
    imagen: '/img/mascota.svg' // Asignación obligatoria
  };

  mascotasMemoria.push(nuevaMascota);
  res.redirect('/mascotas');
});

// Middleware 404 para rutas no contempladas
app.use((req, res) => {
  res.status(404).render('no-encontrado', { title: 'Página No Encontrada' });
});

// Función de inicio asíncrona
async function iniciarServidor() {
  try {
    mascotasMemoria = await cargarMascotasIniciales();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado correctamente en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

iniciarServidor();