const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req,res)=>{
//Guardar las tareas en la BD 
//Obteniendo el proyecto actual
const proyecto = await Proyectos.findOne({url: req.params.url});

//leer elvalor del input
const {tarea} = req.body;
//estado 0 = incompleto y ID del proyecto
const estado = 0;
const proyectoId = proyecto.id;

  //Insertar en la base de datos 
  const resultado = await Tareas.create({tarea,estado,proyectoId});
  
  //redireccionar 
   if(!resultado){
       return next();
   }

   //redireccionar 
   res.redirect(`/proyectos/${req.params.url}`);
}
