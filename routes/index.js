const express = require('express');
const router = express.Router();
//importar los controladores
const ProyectosController = require('../controllers/ProyectosController');

module.exports = function(){
    router.get('/',ProyectosController.proyectosHome);
    router.get('/nuevo-proyecto',ProyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',ProyectosController.nuevoProyecto);
    

    return router;
}