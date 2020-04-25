const express = require('express');
const router = express.Router();
//importar los controladores
const ProyectosController = require('../controllers/ProyectosController');

module.exports = function(){
    router.get('/',ProyectosController.proyectosHome);

    router.get('/nosotros',(req,res)=>{
        res.send('hola');
      });

    return router;
}