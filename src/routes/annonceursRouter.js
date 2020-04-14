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
 * @request GET
 * @controller form_campagne
 * Formulaire d'ajout d'une annonceur
 * 
 */
router.get('/add', annonceursController.add);

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


module.exports = router;
