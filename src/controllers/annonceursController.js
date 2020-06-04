const annonceursController = {};
const Annonceurs = require('../models/annonceurs');

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof annonceursController
 */
annonceursController.index = (req, res) => { //GET:/annonceurs

    const headerAuth = req.headers['cookie'];

    /**Utilise la fonction split pour séparer le userid et le token */
    const token = headerAuth.split('=')
    var userId = token[0];
    if (userId <= 0) {
        return res.send('utilisateur non trouvé')
    }
    Annonceurs.findAll({
        where: {
            id_users: userId
        }

    }).then(annonceurs => {
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
    const headerAuth = req.headers['cookie'];

    /**Utilise la fonction split pour séparer le userid et le token */
    const token = headerAuth.split('=')
    var userId = token[0];
    if (userId <= 0) {
        return res.send('utilisateur non trouvé')
    }
    //  console.log(req.body);
    Annonceurs.create({
        nom_societe: req.body.nom_societe,
        adresse: req.body.adresse,
        id_users: userId

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


    Annonceurs.findOne({
        where: {
            id: req.params.id
        }

    }).then(annonceur => {
      //  console.log(annonceur)

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

    Annonceurs.findOne({
        where: {
            id: req.params.id
        }
    }).then(annonceur => {
       // console.log(annonceur)

        Annonceurs.update({
            nom_societe: req.body.nom_societe,
            adresse: req.body.adresse


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

    Annonceurs.destroy({
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
    Annonceurs.findAll().then(annonceurs => {
        //  console.log(annonceurs);
        try {
            res.json({
                adresse: "OK",
                data: annonceurs,
                message: ""
            })
        } catch (error) {
            res.json({
                adresse: "KO",
                message: error
            })
        }
    })
}

module.exports = annonceursController;