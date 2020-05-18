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
 * Identification du users dans la bdd
 * 
 */
router.post('/create', usersController.create);


/**
 * @request POST
 * @controller login
 * Page authentification du user (login)
 * 
 */
router.get('/login', usersController.login);


/**
 * @request POST
 * @controller login
 * Action authentification du user (login)
 * 
 */
router.post('/registre', usersController.registre);

/**
 * @request GET
 * @controller login
 * Page profil apres authentification du user 
 * 
 */
router.get('/auth', usersController.auth);

router.get('/profil', usersController.profil)


module.exports = router;

