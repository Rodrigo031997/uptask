const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas',{
    id:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    tarea:Sequelize.STRING(100),
    estado:Sequelize.INTEGER
});
//Asignar relacion entre la tabla tareas cpn proyectos
Tareas.belongsTo(Proyectos);

module.exports = Tareas;