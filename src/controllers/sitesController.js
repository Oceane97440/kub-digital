const sitesController = {};
const Sites = require('../models/sites');


/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof sitesController
 */
sitesController.index = (req, res) => { //GET:/admin/sites

    Sites.findAll().then(sites => {
        res.render('sites/liste_sites', {
            sites: sites,
            title: "Listes des sites"
        });
    });


};
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof sitesController
 */
sitesController.add = (req, res) => { //GET:admin/sites/add


    res.render('sites/add_sites', {
        title: "Formulaire ajout sites"
    });

}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof sitesController
 */
sitesController.create = (req, res) => { // POST : admin/sites/create
    console.log(req.body);
    Sites.create({
        nom_site: req.body.nom_site,
        statut: false,
    }).then(res.redirect('/admin/sites'))
}



/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number

 * @memberof sitesController
 */
sitesController.edit = (req, res) => { // GET : admin/sites/edit:id


    Sites.findOne({
        where: {
            id: req.params.id
        }

    }).then(site => {
        res.render('sites/edit_sites', {
            site: site,
            title: "Edit site"
        })
    })


}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof sitesController
 */
sitesController.update = (req, res) => { // POST : admin/sites/update/:id
    //  console.log(req.body);

    Sites.findOne({
        where: {
            id: req.params.id
        }
    }).then(site => {
        Sites.update({
            nom_site: req.body.nom_site,
            statut: false,
        }, {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/admin/sites'))
    })
}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
  * @param - id: number
 * @memberof sitesController
 */
sitesController.delete = (req, res) => { // GET : sites/delete/:id

    Sites.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/sites')
    })
}


/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof sitesController
 */
sitesController.jsonList = (req, res) => {
    Sites.findAll().then(sites => {
        //  console.log(campagnes);
        try {
            res.json({
                statut: "OK",
                data: sites,
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


module.exports = sitesController;