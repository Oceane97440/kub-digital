const formatController = {};
const Formats = require('../models/formats');
REGEX_NOM = /^([a-zA-Z '_]+)$/;
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof formatController
 */
formatController.index = (req, res) => {
    /**GET: /admin/formats/*/

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
formatController.create = (req, res) => {
    /** POST : /admin/formats/create*/
    // console.log(req.body);
    var nom_format = req.body.nom_format
    var dimension_w = req.body.dimension_w
    var dimension_h = req.body.dimension_h
    var prix = req.body.prix

    if (!REGEX_NOM.test(nom_format)) {
        return res.send('Nom du format invalide')
    }

    if (dimension_w < 20 || dimension_h < 20) {
        return res.send('Dimension est invalide')

    }


    if (prix < 10) {
        return res.send('Prix est invalide')

    }


    Formats.create({
        nom_format: nom_format,
        dimension_w: dimension_w,
        dimension_h: dimension_h,
        prix: prix,

    }).then(res.redirect('/admin/formats'))
}


/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof formatController
 */
formatController.edit = (req, res) => {
    /**GET: /admin/formats/edit/:id*/


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
formatController.update = (req, res) => {
    /**POST: /admin/formats/update*/

    Formats.findOne({
        where: {
            id: req.params.id
        }
    }).then(format => {
        var nom_format = req.body.nom_format
        var dimension_w = req.body.dimension_w
        var dimension_h = req.body.dimension_h
        var prix = req.body.prix

        if (!REGEX_NOM.test(nom_format)) {
            return res.send('Nom du format invalide')
        }

        if (dimension_w < 20 || dimension_h < 20) {
            return res.send('Dimension est invalide')

        }


        if (prix < 10) {
            return res.send('Prix est invalide')

        }
        Formats.update({
            nom_format: nom_format,
            dimension_w: dimension_w,
            dimension_h: dimension_h,
            prix: prix,

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
formatController.delete = (req, res) => {
    /** GET : /admin/formats/**delete/:id*/

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