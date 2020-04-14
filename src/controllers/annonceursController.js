const annonceursController = {};
const Annonceur = require('../models/annonceurs');


annonceursController.index = (req, res) => { //GET:/sites

    Annonceur.findAll().then(annonceurs => {
        res.render('annonceurs/listes_annonceurs', {
            annonceurs: annonceurs,
            title: "Listes des annonceurs"
        });
    });


};

annonceursController.add = (req, res) => { //GET:/annonceurs/add


    res.render('annonceurs/add_annonceurs', {
        title: "Formulaire ajout annonceurs"
    });

}

annonceursController.create = (req, res) => { // POST : /annonceurs/create
    console.log(req.body);
    Annonceur.create({
        nom_societe: req.body.nom_societe,
        nom_annonceur: req.body.nom_annonceur,
        statut: req.body.statut,
    }).then(res.redirect('/annonceurs'))
}




annonceursController.edit = (req, res) => { // GET : /annonceurs/edit:id


    Annonceur.findOne({
        where: {
            id: req.params.id
        }

    }).then(annonceur => {
        res.render('annonceurs/edit_annonceurs', {
            annonceur: annonceur,
            title: "Edit annonceurs"
        })
    })


}

annonceursController.update = (req, res) => { // POST : annonceurs/update/:id
    //  console.log(req.body);

    Annonceur.findOne({
        where: {
            id: req.params.id
        }
    }).then(annonceur => {
        Annonceur.update({
            nom_societe: req.body.nom_societe,
            nom_annonceur: req.body.nom_annonceur,
            statut: req.body.statut,
        }, {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/annonceurs'))
    })
}

annonceursController.delete = (req, res) => { // GET : annonceurs/delete/:id

    Annonceur.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/annonceurs')
    })
}

module.exports = annonceursController;