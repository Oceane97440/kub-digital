const router = require("express").Router();

let adminController = require("../controllers/adminController");

/**
 * @request GET
 * @controller index
 * Listing des users dans la bdd 'utilisateurs'
 * 
 */
router.get('/', adminController.index);
/**
 * @request GET
 * @controller edit
 * Formulaire de creaction d'un user
 * 
 */
router.get('/edit/:id', adminController.edit);

/**
 * @request PUT
 * @controller usercreate
 * Modifier les info du user
 * 
 */
router.post('/update/:id', adminController.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un utilisateur grâce à son id
 */
router.get('/delete/:id', adminController.delete);

/**
 * @method GET
 * @url /admin/jsonList
 */
//router.get('/jsonList',adminController.jsonList)

module.exports = router;
