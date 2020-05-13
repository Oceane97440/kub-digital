const Sequelize = require('sequelize');
const db = require('./../db');

const LigneVisuel = sequelize.define('utilisateurs_has_campagnes', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    id_visuels: {type: Sequelize.INTEGER,allowNull:false},
    id_campagne: {type: Sequelize.INTEGER,allowNull:false}

    
},
    {tableName: 'utilisateurs_has_campagnes', timestamps: false, underscored: true}
);

const Visuel = require('../models/visuels');
const Campagne = require('../models/campagnes');


LigneVisuel.belongsTo(Visuel,{foreignKey: 'id_visuels'}); // 1 ligne de Visuel appartien à un Visuel.
Visuel.hasMany(LigneVisuel, {foreignKey: 'id_visuels'});// Une Visuel peut avoir plusieur lignes Visuel.

LigneVisuel.belongsTo(Campagne,{foreignKey: 'id_campagne'}); // 1 ligne de campagne concerne un Visuel.
Campagne.hasMany(LigneVisuel, {foreignKey: 'id_campagne'});// Un Visuel peut avoir plusieur lignes campagne.

module.exports = LigneVisuel;
