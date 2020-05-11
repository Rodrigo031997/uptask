//importar el el modelo proyectos
const Proyectos = require('../models/Proyectos');
//importar el modelo tareas
const Tareas = require('../models/Tareas');


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
        await Proyectos.create({ nombre });
            res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req,res,next)=>{
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
       where: {
           url: req.params.url
       }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise,proyectoPromise])

   //Consultar tareas del proyecto actual
     const tareas = await Tareas.findAll({
       where: {
           proyectoId : proyecto.id
       }
     });
    

    //validar que tengas resultados en el controlador
    if (!proyecto) return next();
    
    //render a la vista}
    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req,res)=>{
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
    
    //render a la vista 
    res.render('nuevoProyecto',{
       nombrePagina: 'Editar Proyecto',
       proyectos,
       proyecto

    });
}

exports.actualizarProyecto = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    // Enviar a la consola lo que el usuario escriba.
    // console.log(req.body);

    // validar que tengamos algo en el input
    const nombre = req.body.nombre;
    const id = req.body.id;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    // si hay errores
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores
        // Insertar en la BD.
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id }} 
        );
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) =>{
    //req contiene la informacion, query o params puedes acceder a la informacion de 
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where:{url: urlProyecto}});

    if(!resultado){
    return next();
    }
    res.status(200).send('Proyecto Eliminado Correctamente');
}
