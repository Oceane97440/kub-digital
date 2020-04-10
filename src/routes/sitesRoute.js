const router = require("express").Router();

let sitesController = require("../controllers/sitesController");


/**
 * @request GET
 * @controller index
 * Affiche la liste des sites
 * 
 */
router.get('/', sitesController.index);


/**
 * @request GET
 * @controller add
 * Formulaire ajout d'un sites
 * 
 */
router.get('/add', sitesController.add);


/**
 * @request POST
 * @controller update
 * Formulaire ajout d'un sites
 * 
 */
router.post('/create', sitesController.create);

module.exports = router;