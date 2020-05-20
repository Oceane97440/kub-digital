const adminController = {};
const User = require('../models/users.js');
const Campagne = require('../models/campagnes');
const Visuels = require('../models/visuels');
var Jwt = require('../middleware/utils');



/**
 * Show the dashbord
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof adminController
 */
adminController.index=(req,res)=>{// GET : /admin/
    var headerAuth = req.headers['authorization'];
   console.log(headerAuth)

    var userId = Jwt.getUserId(headerAuth);
    console.log(userId)
    User.findOne({
        /**affiche les élément du profil */
         attributes: ['id', 'nom', 'prenom', 'profession', 'telephone','email'],
         where:{
             id:userId
         }

     }).then(user => {
        console.log(user)

        res.render('admin/dashboard',{
            user: user,
            title: "Dashboard_admin"
        });console.log(user);
    }); 

}
/**
 * Listing user
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof adminController
 */
adminController.utilisateurs=(req,res)=>{ // GET : /admin/utilisateurs

    /**search l'ensemble des users dans la tables */
    User.findAll().then(users => {
        res.render('admin/liste_users',{
            users: users,
           title: "Liste Users"
        });console.log(users);
    }); 
     


}

/**
 * Edit un user
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof adminController
 */
adminController.edit=(req,res)=>{ // GET : /admin/edit:id

  
    User.findOne({
        where: {id: req.params.id}

    }).then(user => {
    console.log(user)
        res.render('admin/edit_users',{
           user: user,
           title:"Edit user"
        })
    })


}

/**
 * Action post edit du user
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof adminController
 */
adminController.update = (req, res) => { // POST : admin/update/:id
    console.log(req.body);

    User.findOne({
        where: {id: req.params.id}
    }).then(user => {
        User.update({
            nom: req.body.nom_user,
            prenom: req.body.prenom_user,
            email: req.body.email_user,
            profession: req.body.profession_user,
            telephone: req.body.telephone_user,
            statut:req.body.statut
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/admin/utilisateurs'))
    })
}
/**
 * Suppression d'un user
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof adminController
 */
adminController.delete = (req, res) => { // GET : admin/delete/:id


    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/utilisateurs')
    })
}



adminController.campagne_admin = (req, res) => { // GET : admin/campagne/delete/:id

    Campagne.findAll().then(campagnes => {
        res.render('admin/liste_campagne', {
            campagnes: campagnes,
            title: "Listes des campagnes"
        });
    });

}
/**
 * Suppression d'une campagne
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof adminController
 */
adminController.delete_campagne = (req, res) => { // GET : /admin/campagne/delete/:id

    Campagne.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/campagnes')
    })
}

adminController.visuels_admin = (req, res) => {

    Visuels.findAll().then(visuels => {
        res.render('admin/liste_visuels',{
            visuels: visuels,
           title: "Listes des visuels"
        });
    }); 
     

}
/**
 * Suppression d'un visuel
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof adminController
 */
adminController.delete_visuels = (req, res) => { // GET : /admin/visuels/delete/:id

    Visuels.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/visuels')
    })
}



module.exports = adminController;
