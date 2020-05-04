const router = require("express").Router();

let usercampagneController = require("../controllers/userCampagneController");


/**
 * @request GET
 * @controller index
 * Affiche le formulaire inscription
 * 
 */
router.get('/', usercampagneController.index);

router.post('/add', usercampagneController.create);