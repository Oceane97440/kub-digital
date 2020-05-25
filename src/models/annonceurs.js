const Sequelize = require('sequelize');

const db = require('./../db');
//var bcrypt = require("bcryptjs");


module.exports = db.sequelize.define(
    
'annonceurs', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_societe: {type: Sequelize.STRING(45),allowNull:false},
    //statut: {type: Sequelize.BOOLEAN(),allowNull:false},// 1=actif 0=inactif
    id_users: {type: Sequelize.INTEGER,allowNull:false},


},
{tableName: 'annonceurs', underscored: true, timestamps: false}
);

