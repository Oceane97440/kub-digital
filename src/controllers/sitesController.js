const sitesController = {};
const Sites = require('../models/sites');



sitesController.index=(req,res)=>{//GET:/sites


    res.render('sites/liste_sites',{
        title:"Listes des sites"
    });

};

sitesController.add=(req,res)=>{//GET:/sites/add


    res.render('sites/add_sites',{
        title:"Formulaire ajout sites"
    });

}

sitesController.create = (req, res) => { // POST : /sites/create
    console.log(req.body);
    Sites.create({
        nom_site: req.body.nom_site,
        statut: req.body.statut,
    }).then(res.redirect('/sites'))
}


module.exports = sitesController;
