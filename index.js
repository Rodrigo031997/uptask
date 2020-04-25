//Exportar Funciones del servidor Express 
const express = require('express');
// Exportar rutas
const routes = require('./routes');
//Añadir la libreria path para poder acceder al file system de las carpetas
const path = require('path');
//Exportar la libreria BodyParser
const bodyParser = require('body-parser');

//crear la conexión a BD
const db = require('./config/db');
//importar el model
require('./models/Proyectos');
db.sync()
   .then(()=>console.log('Conectado al Servidor'))
   .catch(error => console.log(error));

//crear una aplicación de express
const app = express();

//Donde cargar los archivos estaticos
app.use(express.static('public'));


//habilitar pug como template engine
app.set('view engine','pug');

//Añadir la carpeta de las vistas 
app.set('views', path.join(__dirname, './views'))

//Habilitar BodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}));

//funcion que te permite obtener las rutas de la carpeta Routes
app.use('/',routes());

// definir en que puerto va a correr el sevidor 
app.listen(3000);