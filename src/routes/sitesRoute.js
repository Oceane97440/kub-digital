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


/**
 * @request GET
 * @controller update
 * Formulaire modif d'un sites
 * 
 */
router.get('/edit/:id', sitesController.edit);

/**
 * @request POST
 * @controller update
 * Update les donnée  d'un sites
 * 
 */
router.post('/update/:id', sitesController.update);

/**
 * @request DELETE
 * @controller delete
 *Supprime un site
 * 
 */
router.get('/delete/:id', sitesController.delete);





module.exports = router;