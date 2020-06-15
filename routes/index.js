const express = require('express');
const router = express.Router();
//importar express validator
const {body} = require('express-validator')


//importar los controladores
const ProyectosController = require('../controllers/ProyectosController');
const TareasController = require('../controllers/TareasController');
const UsuariosController = require('../controllers/UsuariosController');
const AuthController = require('../controllers/AuthController');

module.exports = function(){
    router.get('/',
               AuthController.usuarioAutenticado,
               ProyectosController.proyectosHome
               );
    router.get('/nuevo-proyecto',
               AuthController.usuarioAutenticado,
               ProyectosController.formularioProyecto
               );
    router.post('/nuevo-proyecto',
                 AuthController.usuarioAutenticado,
                 body('nombre').not().isEmpty().trim().escape(), 
    //isEmpty revisa que la cadena de texto no venga vacia,
    // Not niega que no este vacia la cadena, 
    //Trim elimina los espacios en blanco, 
    //Escape sustituye los valores especiales
    ProyectosController.nuevoProyecto);
    //Listar Proyecto
    router.get('/proyectos/:url',
                AuthController.usuarioAutenticado,
                ProyectosController.proyectoPorUrl
                );
    //Actualizar el Proyecto
    router.get('/proyectos/editar/:id',
                AuthController.usuarioAutenticado,
                ProyectosController.formularioEditar
                );
    //Guardar cambios Proyecto
    router.post('/nuevo-proyecto/:id',
    AuthController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    //isEmpty revisa que la cadena de texto no venga vacia,
    // Not niega que no este vacia la cadena, 
    //Trim elimina los espacios en blanco, 
    //Escape sustituye los valores especiales
    ProyectosController.actualizarProyecto)

    //eliminar proyecto
    router.delete('/proyectos/:url',
                   AuthController.usuarioAutenticado,
                   ProyectosController.eliminarProyecto
                 );

    //Guardar tareas 
    router.post('/proyectos/:url',
                 AuthController.usuarioAutenticado,
                 TareasController.agregarTarea
                );

    //Actualizar tarea
    router.patch('/tareas/:id', 
                AuthController.usuarioAutenticado,
                TareasController.cambiarEstadoTarea
                );

    //Eliminar tarea
    router.delete('/tareas/:id', 
                AuthController.usuarioAutenticado,
                TareasController.eliminarTarea
                );

    //Crear nueva cuenta
    router.get('/crear-cuenta',UsuariosController.formCrearCuenta);

    //Guardar Usuario
    router.post('/crear-cuenta',UsuariosController.crearCuenta);

    //Confirmar cuenta 
    router.get('/confirmar/:correo',UsuariosController.confirmarCuenta);

    //Iniciar Sesión
    router.get('/iniciar-sesion',UsuariosController.formIniciarSesion);

    //Enviar solicitud  iniciar sesion
    router.post('/iniciar-sesion',AuthController.autenticarUsuario);
    
    //Cerrar
    router.get('/cerrar-sesion',AuthController.cerrarSesion);

    //reestablecer contraseña 
    router.get('/reestablecer',UsuariosController.formRestablecerPassword);
    router.post('/reestablecer',AuthController.enviarToken);
    router.get('/reestablecer/:token',AuthController.validarToken);
    router.post('/reestablecer/:token', AuthController.actualizarPassword);


    return router;
}