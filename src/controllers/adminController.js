const adminController = {};
const Users = require('../models/users.js');
const Campagnes = require('../models/campagnes');
const Visuels = require('../models/visuels');
const Formats = require('../models/formats');
const Sites = require('../models/sites');



/**
 * Show the dashbord
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof adminController
 */
adminController.index = (req, res) => { // GET : /admin/

    Users.findOne().then(user => {
        // console.log(user)

        res.render('admin/dashboard', {
            user: user,
            title: "Dashboard_admin"
        });
        console.log(user);
    });

}
/**
 * Listing user
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof adminController
 */
adminController.utilisateurs = (req, res) => { // GET : /admin/utilisateurs

    /**search l'ensemble des users dans la tables */
    Users.findAll().then(users => {
        res.render('admin/liste_users', {
            users: users,
            title: "Liste Users"
        }); //console.log(users);
    });



}

/**
 * Edit un user
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof adminController
 */
adminController.edit = (req, res) => { // GET : /admin/edit:id


    User.findOne({
        where: {
            id: req.params.id
        }

    }).then(user => {
        console.log(user)
        res.render('admin/edit_users', {
            user: user,
            title: "Edit user"
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
    //  console.log(req.body);

    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        User.update({
            nom: req.body.nom_user,
            prenom: req.body.prenom_user,
            email: req.body.email_user,
            profession: req.body.profession_user,
            telephone: req.body.telephone_user,
            statut: req.body.statut
        }, {
            where: {
                id: req.params.id
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

    Campagnes.findAll({

            include: [{
                    model: Users
                },
                {
                    model: Formats
                },
                {
                    model: Sites
                },
                {
                    model: Visuels
                }



            ]

        }

    ).then(campagnes => {
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

    Campagnes.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/campagnes')
    })
}

adminController.visuels_admin = (req, res) => {

    Visuels.findAll(
        {
         include: [{model: Users}]
        }
    ).then(visuels => {
        res.render('admin/liste_visuels', {
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

adminController.jsonList = (req, res) => {
    User.findAll().then(users => {
        try {
            res.json({
                statut: "OK",
                data: users,
                message: ""
            })
        } catch (error) {
            res.json({
                statut: "KO",
                message: error
            })
        }
    })
}

adminController.jsonList_visuels = (req, res) => {
    Visuels.findAll().then(visuels => {
        //  console.log(visuels);
        try {
            res.json({
                data: visuels,
            })
        } catch (error) {
            res.json({

                message: error
            })
        }
    })
}

module.exports = adminController;