const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

//Función paea revisar si el usuario esta logueado o no
exports.usuarioAutenticado = (req,res,next)=>{
    //Si el usuario esta autenticado,adelante
    if (req.isAuthenticated()) {
        return next();
    }

    //si no esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}


//función para cerrar sesión
exports.cerrarSesion = (req,res)=>{
    req.session.destroy(()=>{
       res.redirect('/');//al cerrar sesión nos lleva al login
    });
}
