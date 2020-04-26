//exportar sequelize que contiene los metodos necesarios para definir los modelos
const Sequelize = require('sequelize');
//importar la configuración de la base de datos
const db = require('../config/db');
//importar libreria de slug
const slug = require('slug');
//importar libreria shortid
const shortid = require('shortid');

//definir el modelo
const Proyectos = db.define('proyectos',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true

    },
    nombre: Sequelize.STRING,
    url : Sequelize.STRING
        
},{
    hooks : {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            
            proyecto.url = `${url}-${shortid.generate()}`;
        },
    }
});

module.exports = Proyectos;