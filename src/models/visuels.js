const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;
//var bcrypt = require("bcryptjs");

const visuels = sequelize.define('visuels', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_visuel: {type: Sequelize.STRING(45),allowNull:false},
    image: {type: Sequelize.STRING(255),allowNull:false},
    id_users: {type: Sequelize.INTEGER,allowNull:false},


   

},
{tableName: 'visuels', underscored: true, timestamps: false}
);
const users=require('./users');

visuels.belongsTo(users,{foreignKey: 'id_users', onDelete: 'cascade', hooks: true });
users.hasMany(visuels, {foreignKey: 'id_users', onDelete: 'cascade', hooks: true});



module.exports = visuels;