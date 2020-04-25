//exportar sequelize que contiene los metodos necesarios para definir los modelos
const Sequelize = require('sequelize');
//importar la configuración de la base de datos
const db = require('../config/db');

//definir el modelo
const Proyectos = db.define('proyectos',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true

    },
    nombre: Sequelize.STRING,
    url : Sequelize.STRING
        
});

module.exports = Proyectos;