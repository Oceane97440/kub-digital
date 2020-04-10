const formatController = {};
const Formats = require('../models/formats');


formatController.index = (req, res) => { //GET: format/


    res.render('formats/liste_formats', {
        title: "Page format"
    });

}

formatController.add = (req, res) => { //GET: format/add


    res.render('formats/add_formats', {
        title: "Formulaire ajout formats"
    });

}


formatController.create = (req, res) => { // POST : /campagne/create
    // console.log(req.body);
    Formats.create({
        nom_format: req.body.nom_format,
        dimension_w: req.body.dimension_w,
        dimension_h: req.body.dimension_h,
        prix: req.body.prix,

    }).then(res.redirect('/format'))
}





// formatController.create=(req,res)=>{ //POST: format/update

//     Formats.findOne({
//         where: {id: req.params.id}
//     }).then(format => {
//         Formats.update({
//             nom_format: req.body.nom_format,
//             dimension: req.body.dimension,
//             prix: req.body.prix,

//         }, {
//             where:{
//                 id:req.params.id
//             }
//         }).then(res.redirect('/format'))
//     })

// }

module.exports = formatController;