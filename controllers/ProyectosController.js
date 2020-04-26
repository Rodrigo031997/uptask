//importar el el modelo proyectos
const Proyectos = require('../models/Proyectos');
//importar el paquete slug
const slug = require('slug');


exports.proyectosHome = async (req,res)=>{
    //Mostrar los registros de la BD en la vista
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req,res)=>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
      nombrePagina:'Nuevo Proyecto',
      proyectos
    });
}

exports.nuevoProyecto = async (req,res)=>{
    const proyectos = await Proyectos.findAll();
    //Acceder a los datos que el usuario envia
    // console.log(req.body);

    //Validar que tengamos algo en el input
    const {nombre} = req.body;

    let errores = [];
    
    if(!nombre){
        errores.push({'texto':'Agrega un nombre al proyecto'})
    }

    //si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos

        })
    }else{
        //No hay errores
        //Insertar eb la BD
        //hooks es una funcion que corre en determinado tiempo
        const proyecto = Proyectos.create({ nombre });
            res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req,res,next)=>{
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
       where: {
           url: req.params.url
       }
    });
    //validar que tengas resultados en el controlador
    if (!proyecto) return next();
    
    //render a la vista}
    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}