const router = require("express").Router();

/* GET users listing. */
let usersController = require("../controllers/usersController");

/**
 * @request GET
 * @controller list
 * Affiche le formulaire inscription
 * 
 */
router.get('/', usersController.index);

/**
 * @request POST
 * @controller list
 * Ajout du users dans la bdd
 * 
 */
router.get('/create', usersController.create);

module.exports = router;

