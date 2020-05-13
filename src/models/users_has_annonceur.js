const Sequelize = require('sequelize');
const db = require('./../db');

const LigneAnnonceur = sequelize.define('utilisateurs_has_annonceurs', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    id_user: {type: Sequelize.INTEGER,allowNull:false},
    id_annonceur: {type: Sequelize.INTEGER,allowNull:false}

    
},
    {tableName: 'utilisateurs_has_annonceurs', timestamps: false, underscored: true}
);

const User = require('../models/users');
const Annonceur = require('../models/annonceurs');


LigneAnnonceur.belongsTo(User,{foreignKey: 'id_user'}); // 1 ligne de User appartien à un User.
User.hasMany(LigneAnnonceur, {foreignKey: 'id_user'});// Une User peut avoir plusieur lignes User.

LigneAnnonceur.belongsTo(Annonceur,{foreignKey: 'id_annonceur'}); // 1 ligne de Annonceur concerne un user.
Annonceur.hasMany(LigneAnnonceur, {foreignKey: 'id_annonceur'});// Un user peut avoir plusieur lignes Annonceur.

module.exports = LigneAnnonceur;
