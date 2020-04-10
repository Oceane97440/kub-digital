const formatController = {};
const Formats = require('../models/formats');


formatController.index = (req, res) => { //GET: format/



    Formats.findAll().then(formats => {
        res.render('formats/liste_formats', {
            formats: formats,
            title: "Page format"
        });
    });

}

formatController.add = (req, res) => { //GET: format/add


    res.render('formats/add_formats', {
        title: "Formulaire ajout formats"
    });

}


formatController.create = (req, res) => { // POST : /format/create
    // console.log(req.body);
    Formats.create({
        nom_format: req.body.nom_format,
        dimension_w: req.body.dimension_w,
        dimension_h: req.body.dimension_h,
        prix: req.body.prix,

    }).then(res.redirect('/format'))
}



formatController.edit = (req, res) => { //GET: format/add


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

formatController.update = (req, res) => { //POST: format/update

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
        }).then(res.redirect('/format'))
    })

}

formatController.delete = (req, res) => { // GET : format/delete/:id

    Formats.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/format')
    })
}


module.exports = formatController;