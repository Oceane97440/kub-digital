const router = require("express").Router();

let annonceursController = require("../controllers/annonceursController");


/**
 * @request GET
 * @controller index
 * Affiche les annonceur
 * 
 */
router.get('/', annonceursController.index);


/**
 * @request POST
 * @controller create
 * Cree un annonceur
 * 
 */
router.post('/create', annonceursController.create);



/**
 * @request GET
 * @controller edit
 * Formulaire d'edit un annonceur
 * 
 */
router.get('/edit/:id', annonceursController.edit);

/**
 * @request POST
 * @controller update
 * Update des info d'un annonceur
 * 
 */
router.post('/update/:id', annonceursController.update);

/**
 * @request DELETE
 * @controller delete
 * Delete un annonceur
 * 
 */
router.get('/delete/:id', annonceursController.delete);

/**
 * @method GET
 * @url /annonceurs/jsonList
 */
router.get('/jsonList',annonceursController.jsonList)

module.exports = router;
