const router = require("express").Router();

let campagneController = require("../controllers/campagneController");


/**
 * @request GET
 * @controller index
 * Affiche les campagnes
 * 
 */
router.get('/', campagneController.index);

/**
 * @request GET
 * @controller form_campagne
 * Formulaire d'ajout d'une campagne
 * 
 */
router.get('/add', campagneController.form_campagne);

/**
 * @request POST
 * @controller create
 * Cree un campagne
 * 
 */
router.post('/create', campagneController.create);



/**
 * @request GET
 * @controller edit
 * Formulaire d'edit d'un campagne
 * 
 */
router.get('/edit/:id', campagneController.edit);

/**
 * @request POST
 * @controller update
 * Update des info de la campagne
 * 
 */
router.post('/update/:id', campagneController.update);

/**
 * @request DELETE
 * @controller delete
 * Delete une campagne
 * 
 */
router.get('/delete/:id', campagneController.delete);

/**
 * @method GET
 * @url /campagne/jsonList
 */
router.get('/jsonList',campagneController.jsonList)


module.exports = router;
