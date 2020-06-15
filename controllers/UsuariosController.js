const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req,res)=>{
    res.render('crearCuenta',{
    nombrePagina: 'Crear Cuenta en Uptask'
    });
}

exports.formIniciarSesion = (req,res)=>{
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion',{
        nmbrePagina: 'Iniciar Sesión en Uptask',
        error
    })
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

        //crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //crear el objeto de usuario
        const usuario = {
            email
        }

        //enviar el email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta Uptask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
    
        //redirigir al usuario
        req.flash('correcto','Enviamos un correo, confirma tu cuenta');
        res.redirect('/iniciar-sesion');
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

exports.formRestablecerPassword = (req,res) =>{
    res.render('reestablecer',{
        nombrePagina: 'Restablecer tu Contraseña'
    })
}

//cambia el estado de una cuenta
exports.confirmarCuenta = async (req, res ) =>{
   const usuario = await Usuarios.findOne({
       where:{
           email: req.params.correo
       }
   });

   if(!usuario){
       req.flash('error','No valido');
       res.redirect('/crear-cuenta');
   }

   usuario.activo = 1;
   await usuario.save();

   req.flash('correcto','Cuenta activada correctamente');
   res.redirect('/iniciar-sesion');
}