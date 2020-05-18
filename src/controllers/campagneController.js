const campagneController = {};
const Campagne = require('../models/campagnes');

/**
 * Listing campagne
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof campagneController
 */
campagneController.index = (req, res) => { // GET : /campagne/
    //console.log(campagnes);
    Campagne.findAll().then(campagnes => {
        res.render('campagnes/liste_campagne', {
            campagnes: campagnes,
            title: "Listes des campagnes"
        });
    });


}


/**
 * Action creaction campagne
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof campagneController
 */
campagneController.create = (req, res) => { // POST : /campagne/create
    // console.log(req.body);
    Campagne.create({
        nom_campagne: req.body.nom_campagne,
        date_d: req.body.date_d,
        date_f: req.body.date_f,
       // statut: req.body.statut,
        id_formats: Number(req.body.format_campagne), /**choisir un format*/
        id_visuels: Number(req.body.visuel_campagne), /**choisir votre visuel apres créaction*/
        id_sites: Number(req.body.site_campagne) /**choisir son site de diffusion*/


    }).then(res.redirect('/campagne'))
}

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof campagneController
 */
campagneController.edit = (req, res) => { // GET : /campagne/edit:id


    Campagne.findOne({
        where: {
            id: req.params.id
        }

    }).then(campagne => {
        //console.log(campagne)
        res.render('campagnes/edit_campagne', {
            campagne: campagne,
            title: "Edit campagne"
        })
    })


}
/**
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof adminController
 */
campagneController.update = (req, res) => { // POST : campagne/update/:id
    //  console.log(req.body);

    Campagne.findOne({
        where: {
            id: req.params.id
        }
    }).then(campagnes => {
        Campagne.update({
            nom_campagne: req.body.nom_campagne,
            date_d: req.body.date_d,
            date_f: req.body.date_f,
         //   statut: req.body.statut,
            id_formats: Number(req.body.format_campagne), /**choisir un format*/
            id_visuels: Number(req.body.visuel_campagne), /**choisir votre visuel apres créaction*/
            id_sites: Number(req.body.site_campagne) /**choisir son site de diffusion*/

        }, {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/campagne'))
    })
}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof campagneController
 */
campagneController.delete = (req, res) => { // GET : campagne/delete/:id

    Campagne.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/campagne')
    })
}

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof campagneController
 */
campagneController.jsonList = (req, res) => {
    Campagne.findAll().then(campagnes => {
        //  console.log(campagnes);
        try {
            res.json({
                statut: "OK",
                data: campagnes,
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

module.exports = campagneController;