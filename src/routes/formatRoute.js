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
 * @controller add
 *Formulaire ajout d'un format
 * 
 */
router.get('/add', formatController.add);

/**
 * @request POST
 * @controller create
 *Ajout d'un formats dans la bdd
 * 
 */
router.post('/create', formatController.create);

/**
 * @request GET
 * @controller edit
 *Formulaire edit du format 
 * 
 */
router.get('/edit/:id', formatController.edit);

/**
 * @request POST
 * @controller update
 *Update des infos du format
 * 
 */
router.post('/update/:id', formatController.update);


/**
 * @request DELETE
 * @controller delete
 *Supprime le format
 * 
 */
router.get('/delete/:id', formatController.delete);


module.exports = router;