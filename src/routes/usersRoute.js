const router = require("express").Router();

/* GET users listing. */
let usersController = require("../controllers/usersController");

/**
 * @request GET
 * @controller index
 * Affiche le formulaire inscription
 * 
 */
router.get('/', usersController.index);

/**
 * @request POST
 * @controller create
 * Ajout du users dans la bdd
 * 
 */
router.post('/create', usersController.create);


/**
 * @request POST
 * @controller login
 * Identification du user (login)
 * 
 */
router.get('/login', usersController.login);

/**
 * @method GET
 * @url /users/jsonList
 */
//router.get('/jsonList',usersController.jsonList)

module.exports = router;

