const Sequelize = require('sequelize');

const db = require('../db');
//var bcrypt = require("bcryptjs");


module.exports = db.sequelize.define(
    
'formats', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_format: {type: Sequelize.STRING(45),allowNull:false},
    dimension_w: {type: Sequelize.STRING(45),allowNull:false},
    dimension_h: {type: Sequelize.STRING(45),allowNull:false},
    prix: {type: Sequelize.FLOAT(),allowNull:false}
  

},
{tableName: 'formats', underscored: true, timestamps: false}
);

