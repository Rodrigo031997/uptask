const express = require('express');
const router = express.Router();
//importar express validator
const {body} = require('express-validator')


//importar los controladores
const ProyectosController = require('../controllers/ProyectosController');
const TareasController = require('../controllers/TareasController');
const UsuariosController = require('../controllers/UsuariosController');

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
    //Actualizar el Proyecto
    router.get('/proyectos/editar/:id',ProyectosController.formularioEditar);
    //Guardar cambios Proyecto
    router.post('/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape(),
    //isEmpty revisa que la cadena de texto no venga vacia,
    // Not niega que no este vacia la cadena, 
    //Trim elimina los espacios en blanco, 
    //Escape sustituye los valores especiales
    ProyectosController.actualizarProyecto)

    //eliminar proyecto
    router.delete('/proyectos/:url',ProyectosController.eliminarProyecto);

    //Guardar tareas 
    router.post('/proyectos/:url',TareasController.agregarTarea);

    //Actualizar tarea
    router.patch('/tareas/:id', TareasController.cambiarEstadoTarea);

    //Eliminar tarea
    router.delete('/tareas/:id', TareasController.eliminarTarea);

    //Crear nueva cuenta
    router.get('/crear-cuenta',UsuariosController.formCrearCuenta);

    //Guardar Usuario
    router.post('/crear-cuenta',UsuariosController.crearCuenta);


    return router;
}