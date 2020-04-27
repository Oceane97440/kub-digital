const visuelsController = {};
const Visuels = require('../models/visuels');


visuelsController.index=(req,res)=>{// GET :/visuels/
//console.log(visuels);
    Visuels.findAll().then(visuels => {
        res.render('visuels/liste_visuels',{
            visuels: visuels,
           title: "Listes des visuels"
        });
    }); 
     
    
}


visuelsController.add=(req,res)=>{// GET :/visuels/add


    res.render('visuels/add_visuels',{
        title:"Formulaire add visuels"
    });

}

visuelsController.create = (req, res) => { // POST :/visuels/create
   // console.log(req.body);
    Visuels.create({
        nom_visuel: req.body.nom_visuel,
        type: req.body.type,
        poids: req.body.poids,
        dimension_visuel_w: req.body.dimension_visuel_w,
        dimension_visuel_h:req.body.dimension_visuel_h,
        //id_formats: Number(req.body.format_visuels),//choisir un format
      


    }).then(res.redirect('/visuels'))
}


visuelsController.edit=(req,res)=>{ // GET :/visuels/edit:id

  
    Visuels.findOne({
        where: {id: req.params.id}

    }).then(visuel => {
//console.log(visuel)
        res.render('visuels/edit_visuels',{
            visuel: visuel,
           title:"Edit visuels"
        })
    })


}

visuelsController.update = (req, res) => { // POST : visuels/update/:id
  //  console.log(req.body);

    Visuels.findOne({
        where: {id: req.params.id}
    }).then(visuels => {
        Visuels.update({
            nom_visuel: req.body.nom_visuel,
            type: req.body.type,
            poids: req.body.poids,
            dimension_visuel_w: req.body.dimension_visuel_w,
            dimension_visuel_h:req.body.dimension_visuel_h,
          //  id_formats: Number(req.body.format_visuels),//choisir un format

        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/visuels'))
    })
}

visuelsController.delete = (req, res) => { // GET : visuels/delete/:id

    Visuels.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/visuels')
    })
}

/**
 * @method GET
 * @url/visuels/jsonList
 */
visuelsController.jsonList = (req, res) => {
    Visuels.findAll().then(visuels => {
      //  console.log(visuels);
        try {
            res.json({
                statut: "OK",
                data: visuels,
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

module.exports = visuelsController;
