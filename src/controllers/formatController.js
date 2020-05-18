const formatController = {};
const Formats = require('../models/formats');

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof formatController
 */
formatController.index = (req, res) => { /**GET: /admin/formats/*/

    Formats.findAll().then(formats => {
        res.render('formats/liste_formats', {
            formats: formats,
            title: "Page format"
        });
    });

}

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof formatController
 */
formatController.create = (req, res) => { /** POST : /admin/formats/create*/ 
    // console.log(req.body);
    Formats.create({
        nom_format: req.body.nom_format,
        dimension_w: req.body.dimension_w,
        dimension_h: req.body.dimension_h,
        prix: req.body.prix,

    }).then(res.redirect('/admin/formats'))
}


/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof formatController
 */
formatController.edit = (req, res) => { /**GET: /admin/formats/edit/:id*/


    Formats.findOne({
        where: {
            id: req.params.id
        }

    }).then(format => {

        res.render('formats/edit_formats', {
            format: format,
            title: "Formulaire modif format"
        })
    })
};
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof formatController
 */
formatController.update = (req, res) => { /**POST: /admin/formats/update*/

    Formats.findOne({
        where: {
            id: req.params.id
        }
    }).then(format => {
        Formats.update({
            nom_format: req.body.nom_format,
            dimension_w: req.body.dimension_w,
            dimension_h: req.body.dimension_h,
            prix: req.body.prix,

        }, {
            where: {
                id: req.params.id
            }
        }).then(res.redirect('/admin/formats'))
    })

}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number

 * @memberof formatController
 */
formatController.delete = (req, res) => { /** GET : /admin/formats/**delete/:id*/

    Formats.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/formats')
    })
}


formatController.jsonList = (req, res) => { 

    //permet de convertion la data en json
    Formats.findAll().then(formats => {
        //    console.log(formats);

        try {
            res.json({
                statut: "OK",
                data: formats,
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


module.exports = formatController;