const router = require("express").Router();

let indexController = require("../controllers/indexController");


/**
 * @request GET
 * @controller index
 * Affiche la home page de la plateforme
 * 
 */
router.get('/', indexController.index);

//router.get('/cookie',indexController.cookie);

module.exports = router;
