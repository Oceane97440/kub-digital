const router = require("express").Router();

let campagneController = require("../controllers/campagneController");


/**
 * @request GET
 * @controller index
 * Affiche les campagnes
 * 
 */
router.get('/', campagneController.index);

module.exports = router;
