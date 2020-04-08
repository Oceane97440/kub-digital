const router = require("express").Router();

let indexController = require("../controllers/indexController");


/**
 * @request GET
 * @controller index
 * Affiche la hp de l'appli
 * 
 */
router.get('/', indexController.index);

module.exports = router;
