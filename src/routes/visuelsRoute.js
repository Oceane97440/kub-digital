const router = require("express").Router();

let visuelsController = require("../controllers/visuelsController");


/**
 * @request GET
 * @controller index
 * Affiche les visuels
 * 
 */
router.get('/', visuelsController.index);

/**
 * @request GET
 * @controller form_visuels
 * Formulaire d'ajout d'une visuels
 * 
 */
router.get('/add', visuelsController.add);

/**
 * @request POST
 * @controller create
 * Cree un visuels
 * 
 */
router.post('/create', visuelsController.create);



/**
 * @request GET
 * @controller edit
 * Formulaire d'edit d'un visuels
 * 
 */
router.get('/edit/:id', visuelsController.edit);

/**
 * @request POST
 * @controller update
 * Update des info de la visuels
 * 
 */
router.post('/update/:id', visuelsController.update);

/**
 * @request DELETE
 * @controller delete
 * Delete une visuels
 * 
 */
router.get('/delete/:id', visuelsController.delete);

/**
 * @method GET
 * @url /visuels/jsonList
 */
router.get('/jsonList',visuelsController.jsonList)


module.exports = router;
