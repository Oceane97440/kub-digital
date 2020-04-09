const Sequelize = require('sequelize');

const db = require('./../db');
//var bcrypt = require("bcryptjs");


module.exports = db.sequelize.define(
    
'campagnes', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_campagne: {type: Sequelize.STRING(45),allowNull:false},
    date_d: {type: Sequelize.STRING(45),allowNull:false},
    date_f: {type: Sequelize.STRING(45),allowNull:false},
    budget: {type: Sequelize.STRING(),allowNull:false},
    statut: {type: Sequelize.BOOLEAN(),allowNull:false}// 1=actif 0=inactif
   // id_formats:{}

},
{tableName: 'campagnes', underscored: true, timestamps: false}
);

