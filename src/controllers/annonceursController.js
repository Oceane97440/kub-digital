const annonceursController = {};
const Annonceur = require('../models/annonceurs');

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof annonceursController
 */
annonceursController.index = (req, res) => { //GET:/annonceurs

    Annonceur.findAll().then(annonceurs => {
        res.render('annonceurs/listes_annonceurs', {
            annonceurs: annonceurs,
            title: "Listes des annonceurs"
        });
    });


};



/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof annonceursController
 */
annonceursController.create = (req, res) => { // POST : /annonceurs/create
    console.log(req.body);
    Annonceur.create({
        nom_societe: req.body.nom_societe,
       // nom_annonceur: req.body.nom_annonceur,
        statut: req.body.statut,
    }).then(res.redirect('/annonceurs'))
}



/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof annonceursController
 */
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
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof annonceursController
 */
annonceursController.update = (req, res) => { // POST : annonceurs/update/:id
    //  console.log(req.body);

    Annonceur.findOne({
        where: {
            id: req.params.id
        }
    }).then(annonceur => {
        Annonceur.update({
            nom_societe: req.body.nom_societe,
          //  nom_annonceur: req.body.nom_annonceur,
            statut: req.body.statut,
        }, {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/annonceurs'))
    })
}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof annonceursController
 */
annonceursController.delete = (req, res) => { // GET : annonceurs/delete/:id

    Annonceur.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/annonceurs')
    })
}

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof annonceursController
 */
annonceursController.jsonList = (req, res) => {
    Annonceur.findAll().then(annonceurs => {
      //  console.log(annonceurs);
        try {
            res.json({
                statut: "OK",
                data: annonceurs,
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

module.exports = annonceursController;