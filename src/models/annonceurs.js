const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;


const annonceurs = sequelize.define('annonceurs', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_societe: {type: Sequelize.STRING(45),allowNull:false},
    adresse: {type: Sequelize.STRING(45),allowNull:false},
    id_users: {type: Sequelize.INTEGER,allowNull:false},


},
{tableName: 'annonceurs', underscored: true, timestamps: false}
);

const users=require('./users');

annonceurs.belongsTo(users,{foreignKey: 'id_users', onDelete: 'cascade', hooks: true });
users.hasMany(annonceurs, {foreignKey: 'id_users', onDelete: 'cascade', hooks: true});

module.exports = annonceurs;