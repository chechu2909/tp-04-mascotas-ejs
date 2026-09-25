# TP 04 — Aplicación Web de Mascotas con EJS

## ¿De qué trata el proyecto?
Es una página web hecha con Node.js, Express y EJS para administrar un catálogo de mascotas en adopción. 

La aplicación permite:
* Ver la lista completa de mascotas y filtrarlas por especie.
* Ver la información detallada de cada mascota.
* Cargar nuevas mascotas mediante un formulario.

---

## Cómo instalar y ejecutar el proyecto

1. Descargar o clonar el proyecto.
2. Abrir la terminal en la carpeta del proyecto e instalar las dependencias:
   ```bash
   npm install
Iniciar el servidor:

Bash
npm start
Abrir el navegador e ingresar a: http://localhost:3000

Páginas y Rutas
GET /: Página de bienvenida.

GET /mascotas: Lista de todas las mascotas (con opción de filtrar).

GET /mascotas/nueva: Formulario para agregar una mascota.

GET /mascotas/:id: Ver el detalle de una mascota específica.

POST /mascotas: Guarda la nueva mascota enviada desde el formulario.

Estructura del Proyecto
views/layouts/main.ejs: Es el diseño base (HTML) que usan todas las páginas.

views/: Contiene las páginas principales de la web (inicio.ejs, no-encontrado.ejs, etc.).

views/partials/: Partes repetitivas que se reutilizan en el sitio, como el encabezado (encabezado.ejs) y el pie de página (pie.ejs).

public/: Archivos estáticos como los estilos CSS, imágenes SVG y JavaScript del cliente.

Respuestas a Preguntas Teóricas
¿Qué diferencia hay entre layout, vista y parcial?

El layout es la plantilla general con la estructura HTML de todo el sitio. La vista es la página específica que cambia según la ruta (por ejemplo, el formulario o el detalle). El parcial es un pedazo de código chico que se repite en varias páginas, como el menú de arriba o el pie de página.

¿Cómo pasan los datos del servidor a la vista en EJS?

Se envían usando res.render('nombre-vista', { datos }) desde Node.js. Dentro del archivo .ejs, se muestran usando <%= %> para texto normal o <%- %> si se incluye HTML o parciales.

¿Para qué sirven express.static y express.urlencoded?

express.static le dice a Express qué carpeta tiene los archivos públicos (CSS, imágenes, JS). express.urlencoded sirve para que Express pueda leer los datos que el usuario escribe en un formulario POST (req.body).

¿Cómo funciona el envío del formulario con POST y redirección?

Cuando el usuario envía el formulario, los datos viajan por POST a /mascotas. El servidor los procesa y responde con una redirección (302) a la lista de mascotas. El navegador recibe eso y hace un GET /mascotas automático para mostrar la lista actualizada. Esto evita que si el usuario recarga la página, se vuelva a enviar la mascota duplicada.

¿Por qué desaparece la nueva mascota cuando reinicio el servidor?

Porque los datos nuevos se guardan en un arreglo dentro de la memoria RAM mientras el servidor está prendido. Al reiniciar Node.js, la memoria se borra y la aplicación vuelve a leer únicamente el archivo original mascotas.json.