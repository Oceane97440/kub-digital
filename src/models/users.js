const sequelize = require('../src/database.js').sequelize;

const Sequelize = require('sequelize');
//var bcrypt = require("bcryptjs");


const User = sequelize.define('utilisateurs', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    prenom: {type: Sequelize.STRING(45),allowNull:false},
    profession: {type: Sequelize.STRING(200),allowNull:false},
    email: {type: Sequelize.STRING(45),allowNull:false},
    password: {type: Sequelize.STRING(),allowNull:false},
    telephone: {type: Sequelize.STRING(45),allowNull:false},
    // role: {type: Sequelize.INTEGER(), allowNull:false}, 1 =admi 0=user
    // statut: {type: Sequelize.INTEGER(), allowNull:false} 1=actif 0=inatif

},
    {tableName: 'utilisateurs', underscored: true, paranoid: true}
);

module.exports = User;
