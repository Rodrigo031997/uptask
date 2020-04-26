const express = require('express');
const router = express.Router();
//importar express validator
const {body} = require('express-validator')


//importar los controladores
const ProyectosController = require('../controllers/ProyectosController');

module.exports = function(){
    router.get('/',ProyectosController.proyectosHome);
    router.get('/nuevo-proyecto',ProyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(), 
    //isEmpty revisa que la cadena de texto no venga vacia,
    // Not niega que no este vacia la cadena, 
    //Trim elimina los espacios en blanco, 
    //Escape sustituye los valores especiales
    ProyectosController.nuevoProyecto);
    //Listar Proyecto
    router.get('/proyectos/:url',ProyectosController.proyectoPorUrl);
    return router;
}