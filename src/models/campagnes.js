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


campagnes.belongsTo(formats,{foreignKey: 'id_formats', onDelete: 'cascade', hooks: true });// l'article à une catégorie.
formats.hasMany(campagnes, {foreignKey: 'id_formats', onDelete: 'cascade', hooks: true});// Une catégorie peut avoir plusieur articles.
// Article.hasMany(LignePanier, {foreignKey: 'articles_id'});// Un article peut avoir plusieur lignes panier.


module.exports = campagnes;