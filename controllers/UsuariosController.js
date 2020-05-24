const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req,res)=>{
    res.render('crearCuenta',{
    nombrePagina: 'Crear Cuenta en Uptask'
    });
}

exports.crearCuenta = async (req,res)=>{
    //leer los datos
    const {email,password} = req.body;
    // console.log(req.body)

    //crear el usuario
   
    try {
        //Crear el usuario
        await Usuarios.create({
            email,
            password
        });

        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error',error.errors.map(error=>error.message));
        //manejar el error
        res.render('crearCuenta',{
          mensajes: req.flash(),
          nombrePagina: 'Crear cuenta en Uptask',
          email,
          password 
        });
        // console.log(error);
    }
}