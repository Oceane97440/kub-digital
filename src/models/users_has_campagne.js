const Sequelize = require('sequelize');
const db = require('./../db');

const LigneCampagne = sequelize.define('utilisateurs_has_campagnes', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    id_user: {type: Sequelize.INTEGER,allowNull:false},
    id_campagne: {type: Sequelize.INTEGER,allowNull:false}

    
},
    {tableName: 'utilisateurs_has_campagnes', timestamps: false, underscored: true}
);

const User = require('../models/users');
const Campagne = require('../models/campagnes');


LigneCampagne.belongsTo(User,{foreignKey: 'id_user'}); // 1 ligne de User appartien à un User.
User.hasMany(LigneCampagne, {foreignKey: 'id_user'});// Une User peut avoir plusieur lignes User.

LigneCampagne.belongsTo(Campagne,{foreignKey: 'id_campagne'}); // 1 ligne de campagne concerne un user.
Campagne.hasMany(LigneCampagne, {foreignKey: 'id_campagne'});// Un user peut avoir plusieur lignes campagne.

module.exports = LigneCampagne;
