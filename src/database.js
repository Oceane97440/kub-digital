const DATABASE = require('../src/env.database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(DATABASE.LOCAL.DBNAME, DATABASE.LOCAL.USERNAME, DATABASE.LOCAL.PASSWORD, { // nom de la BDD, username, password
host: 'localhost',
dialect: 'mysql',
logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};

exports.sequelize = sequelize;