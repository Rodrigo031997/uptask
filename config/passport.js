const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al Modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

//local strategy - Login con credenciales propias (usuario y password)
passport.use(//nos permitira configurar passport
   new LocalStrategy(
       //Por default passport espera un usuario y contraseña
       {
          usernameField: 'email',
          passwordField: 'password'
       },
       async (email,password,done) =>{
           try {
               const usuario = await Usuarios.findOne({
                   where:{email: email}
               });
               //El Usuario existe, password incorrecto
               if (!usuario.verificarPassword(password)) {
                   return done(null,false,{
                       message: 'Contraseña Incorrecta'
                   });
               }
               //El email exite, y el password es correcto
               return done(null,usuario);
           } catch (error) {
            //Ese usuario no existe
            return done(null,false,{
                message: 'Esa cuenta no existe'
            })
               
           }
           
       }
   )
);

//Serializar el usuario
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
});

//exportar
module.exports = passport;