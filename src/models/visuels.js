const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;
//var bcrypt = require("bcryptjs");

const visuels = sequelize.define('visuels', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_visuel: {type: Sequelize.STRING(45),allowNull:false},
    type: {type: Sequelize.STRING(45),allowNull:false},
    poids: {type: Sequelize.STRING(45),allowNull:false},
    dimension_visuel_w: {type: Sequelize.STRING(),allowNull:false},
    dimension_visuel_h: {type: Sequelize.STRING(),allowNull:false},

   

},
{tableName: 'visuels', underscored: true, timestamps: false}
);

// const formats = require('../models/formats');



// visuels.belongsTo(formats,{foreignKey: 'id_formats', onDelete: 'cascade', hooks: true });// un visuel à un format.
// formats.hasMany(visuels, {foreignKey: 'id_formats', onDelete: 'cascade', hooks: true});// Un format peut avoir plusieur visueL.


module.exports = visuels;