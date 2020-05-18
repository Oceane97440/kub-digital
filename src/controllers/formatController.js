const formatController = {};
const Formats = require('../models/formats');


formatController.index = (req, res) => { //GET: /admin/formats/



    Formats.findAll().then(formats => {
        res.render('formats/liste_formats', {
            formats: formats,
            title: "Page format"
        });
    });

}


formatController.create = (req, res) => { // POST : //admin/formats/create
    // console.log(req.body);
    Formats.create({
        nom_format: req.body.nom_format,
        dimension_w: req.body.dimension_w,
        dimension_h: req.body.dimension_h,
        prix: req.body.prix,

    }).then(res.redirect('/admin/formats'))
}



formatController.edit = (req, res) => { //GET: /admin/formats/edit/:id


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

formatController.update = (req, res) => { //POST: /admin/formats/update

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

formatController.delete = (req, res) => { // GET : /admin/formats//delete/:id

    Formats.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/formats')
    })
}


formatController.jsonList = (req, res) => {//GET //admin/formats//jsonlist

    //permet de convertion la data en json
    Formats.findAll().then(formats => {
   //     console.log(formats);

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