const sitesController = {};
const Sites = require('../models/sites');



sitesController.index = (req, res) => { //GET:/sites

    Sites.findAll().then(sites => {
        res.render('sites/liste_sites', {
            sites: sites,
            title: "Listes des sites"
        });
    });


};

sitesController.add = (req, res) => { //GET:/sites/add


    res.render('sites/add_sites', {
        title: "Formulaire ajout sites"
    });

}

sitesController.create = (req, res) => { // POST : /sites/create
    console.log(req.body);
    Sites.create({
        nom_site: req.body.nom_site,
        statut: req.body.statut,
    }).then(res.redirect('/sites'))
}




sitesController.edit = (req, res) => { // GET : /sites/edit:id


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

sitesController.update = (req, res) => { // POST : campagne/update/:id
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
        }).then(res.redirect('/sites'))
    })
}

sitesController.delete = (req, res) => { // GET : sites/delete/:id

    Sites.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/sites')
    })
}

module.exports = sitesController;