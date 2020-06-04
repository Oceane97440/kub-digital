const router = require("express").Router();

let adminController = require("../controllers/adminController");

/**
 * @request GET
 * @controller dashboard
 * Shows dashboard
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
 * Formulaire d'édition d'un user
 * 
 */
router.get('/edit/:id', adminController.edit);

/**
 * @request PUT
 * @controller usercreate
 * Action modification des les info du user
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
 * @request DELETE
 * @controller delete
 * Listing des campagne créé par les users
 */
router.get('/campagnes', adminController.campagne_admin)
/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprimer une campagnes
 */
router.get('/campagnes/delete/:id', adminController.delete_campagne);
/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Listing des visuels créé par les utilisateurs 
 */
router.get('/visuels', adminController.visuels_admin)
/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un visuel grâce à son id
 */
router.get('/visuels/delete/:id', adminController.delete_visuels);
router.get('/utilisateurs/jsonList', adminController.jsonList);
router.get('/visuels/jsonList', adminController.jsonList_visuels);



module.exports = router;
