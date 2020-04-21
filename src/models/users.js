const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;
//var bcrypt = require("bcryptjs");


const users = sequelize.define('utilisateurs', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    prenom: {type: Sequelize.STRING(45),allowNull:false},
    email: {type: Sequelize.STRING(45),allowNull:false},
    password: {type: Sequelize.STRING(),allowNull:false},
    profession: {type: Sequelize.STRING(200),allowNull:false},
    telephone: {type: Sequelize.STRING(45),allowNull:false},
    // role: {type: Sequelize.INTEGER(), allowNull:false}, 1 =admi 0=user
  //  statut: {type: Sequelize.BOOLEAN(),allowNull:false}// 1=actif 0=inactif


},
{tableName: 'utilisateurs', underscored: true, timestamps: false}
);

// const annonceurs = require('../models/annonceurs');


// users.belongsTo(annonceurs,{foreignKey: 'id_annonceurs', onDelete: 'cascade', hooks: true });// la campagne à un format.
// annonceurs.hasMany(users, {foreignKey: 'id_annonceurs', onDelete: 'cascade', hooks: true});// Un format peut avoir plusieur articles.

module.exports = users;