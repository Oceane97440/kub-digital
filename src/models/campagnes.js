const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;
//var bcrypt = require("bcryptjs");

const campagnes = sequelize.define('campagnes', {

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
const formats = require('../models/formats');
const visuels=require('../models/visuels')
const sites =require('../models/sites');


campagnes.belongsTo(formats,{foreignKey: 'id_formats', onDelete: 'cascade', hooks: true });// la campagne à un format.
formats.hasMany(campagnes, {foreignKey: 'id_formats', onDelete: 'cascade', hooks: true});// Un format peut avoir plusieur articles.


campagnes.belongsTo(visuels,{foreignKey: 'id_visuels', onDelete: 'cascade', hooks: true });// la campagne à un visuel.
visuels.hasMany(campagnes, {foreignKey: 'id_visuels', onDelete: 'cascade', hooks: true});// Un visuel peut avoir plusieur campagne.

campagnes.belongsTo(sites,{foreignKey: 'id_sites', onDelete: 'cascade', hooks: true });// la campagne à un site.
sites.hasMany(campagnes, {foreignKey: 'id_sites', onDelete: 'cascade', hooks: true});// Un site peut avoir plusieur campagne.

module.exports = campagnes;