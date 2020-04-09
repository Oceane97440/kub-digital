const campagneController = {};
const Campagne = require('../models/campagnes');


campagneController.index=(req,res)=>{// GET : /campagne/


    res.render('campagnes/liste_campagne',{
        title:"Listes des campagnes"
    });

}


campagneController.form_campagne=(req,res)=>{// GET : /campagne/add


    res.render('campagnes/add_campagne',{
        title:"Formulaire add campagnes"
    });

}

campagneController.create = (req, res) => { // POST : /campagne/create
    console.log(req.body);
    Campagne.create({
        nom_campagne: req.body.nom_campagne,
        date_d: req.body.date_d,
        date_f: req.body.date_f,
        budget: req.body.budget,
        statut:req.body.statut
    }).then(res.redirect('/campagne'))
}


module.exports = campagneController;
