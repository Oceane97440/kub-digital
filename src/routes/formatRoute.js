const router = require("express").Router();

let formatController = require("../controllers/formatController");

/**
 * @request GET
 * @controller index
 * Listing tout les formats
 * 
 */
router.get('/', formatController.index);

/**
 * @request GET
 * @controller index
 *Formulaire ajout d'un format
 * 
 */
router.get('/add', formatController.add);

/**
 * @request POST
 * @controller index
 *Ajout d'un formats dans la bdd
 * 
 */
router.post('/create', formatController.create);


module.exports = router;
