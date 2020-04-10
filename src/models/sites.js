const Sequelize = require('sequelize');

const db = require('../db');
//var bcrypt = require("bcryptjs");


module.exports = db.sequelize.define(
    
'sites', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_site: {type: Sequelize.STRING(45),allowNull:false},
    statut: {type: Sequelize.BOOLEAN(),allowNull:false}// 1=actif 0=inactif

},
{tableName: 'sites', underscored: true, timestamps: false}
);

