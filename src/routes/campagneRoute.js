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
 * @controller index
 * Affiche les campagnes
 * 
 */
router.get('/add', campagneController.form_campagne);

/**
 * @request POST
 * @controller index
 * Cree un campagne
 * 
 */
router.post('/create', campagneController.create);



module.exports = router;
