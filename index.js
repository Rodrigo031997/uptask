//Exportar Funciones del servidor Express 
const express = require('express');
// Exportar rutas
const routes = require('./routes');

//crear una aplicación de express
const app = express();

app.use('/',routes());

// definir en que puerto va a correr el sevidor 
app.listen(3000);