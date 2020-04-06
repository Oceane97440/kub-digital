const router = require("express").Router();

let indexController = require("../controllers/indexController");

router.get('/', indexController.index);

module.exports = router;
