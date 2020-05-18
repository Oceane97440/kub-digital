const sitesController = {};
const Sites = require('../models/sites');



sitesController.index = (req, res) => { //GET:/admin/sites

    Sites.findAll().then(sites => {
        res.render('sites/liste_sites', {
            sites: sites,
            title: "Listes des sites"
        });
    });


};

sitesController.add = (req, res) => { //GET:admin/sites/add


    res.render('sites/add_sites', {
        title: "Formulaire ajout sites"
    });

}

sitesController.create = (req, res) => { // POST : admin/sites/create
    console.log(req.body);
    Sites.create({
        nom_site: req.body.nom_site,
        statut: req.body.statut,
    }).then(res.redirect('/admin/sites'))
}




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

sitesController.update = (req, res) => { // POST : admin/sites/update/:id
    //  console.log(req.body);

    Sites.findOne({
        where: {
            id: req.params.id
        }
    }).then(site => {
        Sites.update({
            nom_site: req.body.nom_site,
            statut: req.body.statut,
        }, {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/admin/sites'))
    })
}

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
 * @method GET
 * @url /sites/jsonList
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