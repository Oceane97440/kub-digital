const Sequelize = require('sequelize');

const sequelize = require('../db').sequelize;
//var bcrypt = require("bcryptjs");

const commandes = sequelize.define('commandes', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    id_user: {type: Sequelize.INTEGER,allowNull:false},
    id_annonceur: {type: Sequelize.INTEGER,allowNull:false},
    id_campagne: {type: Sequelize.INTEGER,allowNull:false},
    nbr_impressions: {type: Sequelize.INTEGER,allowNull:false},
    budget_total: {type: Sequelize.FLOAT,allowNull:false},


},
{tableName: 'commandes', underscored: true, timestamps: false}
);
//association
const user = require('./users');
const annonceur=require('./annonceurs')
const campagne =require('./campagnes');


commandes.belongsTo(user,{foreignKey: 'id_user', onDelete: 'cascade', hooks: true });// la campagne à un format.
user.hasMany(commandes, {foreignKey: 'id_user', onDelete: 'cascade', hooks: true});// Un format peut avoir plusieur articles.


commandes.belongsTo(annonceur,{foreignKey: 'id_annonceur', onDelete: 'cascade', hooks: true });// la campagne à un visuel.
annonceur.hasMany(commandes, {foreignKey: 'id_annonceur', onDelete: 'cascade', hooks: true});// Un visuel peut avoir plusieur campagne.

commandes.belongsTo(campagne,{foreignKey: 'id_campagne', onDelete: 'cascade', hooks: true });// la campagne à un site.
campagne.hasMany(commandes, {foreignKey: 'id_campagne', onDelete: 'cascade', hooks: true});// Un site peut avoir plusieur campagne.




module.exports = commandes;