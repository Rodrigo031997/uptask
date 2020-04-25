exports.proyectosHome = (req,res)=>{
    res.render('index',{
        nombrePagina: 'Proyectos'
    });
}

exports.formularioProyecto = (req,res)=>{
    res.render('nuevoProyecto',{
      nombrePagina:'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = (req,res)=>{
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
            errores
        });
    }
}