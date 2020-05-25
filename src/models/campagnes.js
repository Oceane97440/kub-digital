const Sequelize = require('sequelize');

const sequelize = require('../db').sequelize;
//var bcrypt = require("bcryptjs");

const campagnes = sequelize.define('campagnes', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_campagne: {type: Sequelize.STRING(45),allowNull:false},
    date_d: {type: Sequelize.STRING(45),allowNull:false},
    date_f: {type: Sequelize.STRING(45),allowNull:false},
   // nbr_impressions: {type: Sequelize.INTEGER,allowNull:false},
   // budget_total: {type: Sequelize.FLOAT,allowNull:false},

},
{tableName: 'campagnes', underscored: true, timestamps: false}
);
//association
const formats = require('./formats');
const visuels=require('./visuels')
const sites =require('./sites');


campagnes.belongsTo(formats,{foreignKey: 'id_formats', onDelete: 'cascade', hooks: true });// la campagne à un format.
formats.hasMany(campagnes, {foreignKey: 'id_formats', onDelete: 'cascade', hooks: true});// Un format peut avoir plusieur articles.


campagnes.belongsTo(visuels,{foreignKey: 'id_visuels', onDelete: 'cascade', hooks: true });// la campagne à un visuel.
visuels.hasMany(campagnes, {foreignKey: 'id_visuels', onDelete: 'cascade', hooks: true});// Un visuel peut avoir plusieur campagne.

campagnes.belongsTo(sites,{foreignKey: 'id_sites', onDelete: 'cascade', hooks: true });// la campagne à un site.
sites.hasMany(campagnes, {foreignKey: 'id_sites', onDelete: 'cascade', hooks: true});// Un site peut avoir plusieur campagne.




module.exports = campagnes;