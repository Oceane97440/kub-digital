const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;

const format_site = sequelize.define('formats_has_sites', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    id_formats: {type: Sequelize.INTEGER,allowNull:false},
    id_sites: {type: Sequelize.INTEGER,allowNull:false},

    
},
    {tableName: 'articles_has_paniers', timestamps: false, underscored: true}
);

const formats = require('../models/formats');
const sites =require('../models/sites');


// LignePanier.belongsTo(Panier,{foreignKey: 'paniers_id'}); // 1 ligne de panier appartien à un Panier.
// Panier.hasMany(LignePanier, {foreignKey: 'paniers_id'});// Une panier peut avoir plusieur lignes panier.

// LignePanier.belongsTo(Article,{foreignKey: 'articles_id'}); // 1 ligne de panier concerne un article.
// Article.hasMany(LignePanier, {foreignKey: 'articles_id'});// Un article peut avoir plusieur lignes panier.

module.exports = format_site;
