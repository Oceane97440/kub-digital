const router = require("express").Router();

let adminController = require("../controllers/adminController");

/**
 * @request GET
 * @controller dashboard
 * Listing des users dans la bdd 'utilisateurs'
 * 
 */
router.get('/', adminController.index);

/**
 * @request GET
 * @controller index
 * Listing des users dans la bdd 'utilisateurs'
 * 
 */
router.get('/utilisateurs', adminController.utilisateurs);
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

router.get('/campagnes', adminController.campagne_admin)
router.get('/campagnes/delete/:id', adminController.delete_campagne);
router.get('/visuels', adminController.visuels_admin)
router.get('/visuels/delete/:id', adminController.delete_visuels);


module.exports = router;
