
# TP 04 — Aplicación Web de Mascotas con EJS

## ¿De qué trata el proyecto?
Es una aplicación web que hice con Node.js, Express y EJS para administrar un refugio de mascotas en adopción. 

La página permite:
 Ver todas las mascotas registradas y filtrarlas según su especie (Perro, Gato, Conejo, etc.).
 Entrar al detalle de cada mascota para ver más información.
 Registrar nuevas mascotas desde un formulario con validaciones.
 Cargar los datos al iniciar el servidor de forma asíncrona sin bloquear la aplicación.

---

## Cómo instalar y ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la terminal dentro de la carpeta del proyecto e instalar las dependencias:
   ```bash
   npm install
Levantar el servidor:

Bash
npm start
Abrir el navegador e ingresar a: http://localhost:3000

Rutas de la aplicación
GET /: Página de inicio y bienvenida.

GET /mascotas: Listado general de mascotas (permite filtrar por especie usando ?especie=...).

GET /mascotas/nueva: Muestra el formulario para cargar una nueva mascota.

GET /mascotas/:id: Muestra la ficha con el detalle de una mascota en particular.

POST /mascotas: Recibe los datos del formulario, los valida y agrega la mascota a la lista en memoria.

Estructura del proyecto
src/index.js: Es el archivo principal. Levanta el servidor Express, configura EJS y define las rutas de la web.

src/archivos.js: Se encarga de leer el JSON inicial de forma asíncrona usando fs.promises y async/await.

datos/mascotas.json: Archivo JSON que contiene la lista inicial de mascotas.

views/layouts/main.ejs: Plantilla base con el HTML principal y la estructura compartida del sitio.

views/: Contiene las distintas páginas (inicio.ejs, lista.ejs, detalle.ejs, nueva.ejs y no-encontrado.ejs).

views/partials/: Trozos de código reutilizables, como el encabezado (encabezado.ejs) y el pie de página (pie.ejs).

public/: Archivos estáticos como los estilos CSS, las imágenes de los animales y el icono SVG (mascota.svg).

Desarollo de Preguntas 

¿Qué diferencia hay entre layout, vista y parcial?
Layout: Es la estructura fija de HTML que comparten todas las páginas de la web (como la etiqueta <html>, <head> y la llamada al CSS).

Vista: Es el contenido específico de la página que el usuario está viendo en ese momento (por ejemplo, el formulario de carga o la lista general).

Parcial: Es un pedazo de plantilla reutilizable que se repite en varios lados para no copiar y pegar código, como el menú superior o el footer.

¿Cómo pasan los datos del servidor a la vista en EJS?
En el servidor usamos res.render('nombre-de-vista', { datos }) para enviar variables a la plantilla. Dentro del archivo .ejs, usamos <%= %> cuando queremos mostrar texto o números, y <%- %> si necesitamos incluir un archivo parcial o código HTML.

¿Para qué sirven express.static y express.urlencoded?
express.static: Le indica a Express en qué carpeta guardamos los archivos públicos que el navegador necesita pedir directamente (CSS, imágenes SVG/JPG, JS del cliente).

express.urlencoded: Es un middleware que permite a Express entender y procesar los datos que el usuario manda al enviar un formulario mediante el método POST (req.body).

¿Cómo funciona el envío del formulario con POST y redirección?
Cuando la persona llena el formulario y toca guardar, los datos viajan por POST a la ruta /mascotas. El servidor valida que todo esté bien, los agrega al listado y le responde al navegador con una redirección (HTTP 302). El navegador hace automáticamente una consulta GET /mascotas para cargar la lista actualizada. Esto se usa para evitar que si el usuario refresca la página, se vuelva a enviar el formulario por duplicado.

¿Por qué desaparece la nueva mascota cuando reinicio el servidor?
Porque la nueva mascota se guarda únicamente en una variable en la memoria RAM mientras la aplicación está corriendo. Al reiniciar el servidor de Node.js, esa memoria se limpia y el programa vuelve a leer solamente las mascotas originales que están en el archivo datos/mascotas.json.