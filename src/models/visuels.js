const Sequelize = require('sequelize');

const sequelize = require('./../db').sequelize;
//var bcrypt = require("bcryptjs");

const visuels = sequelize.define('visuels', {

    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom_visuel: {type: Sequelize.STRING(45),allowNull:false},
    image: {type: Sequelize.STRING(255),allowNull:false},


   

},
{tableName: 'visuels', underscored: true, timestamps: false}
);



module.exports = visuels;