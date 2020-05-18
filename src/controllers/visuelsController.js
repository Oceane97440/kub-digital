const visuelsController = {};
const Visuels = require('../models/visuels');
const path = require('path');
const sharp = require('sharp');

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof visuelsController
 */
visuelsController.index=(req,res)=>{// GET :/visuels/
//console.log(visuels);
    Visuels.findAll().then(visuels => {
        res.render('visuels/liste_visuels',{
            visuels: visuels,
           title: "Listes des visuels"
        });
    }); 
     
    
}


/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof visuelsController
 */
visuelsController.create = async(req, res) => { // POST :/visuels/create

    console.log(req.body);
    console.log(req.files);
    console.log(uploadedFile);


   var uploadedFile = req.files.image_visuel; // nom du champ image

   /**il faut que le dossier upload existe... ;) */ 
   await uploadedFile.mv('public/uploads/'+uploadedFile.name, err => {
        if (err) 
        return res.status(500).send(err)
    });

   fileName = path.parse(uploadedFile.name).name + ".jpg"; /* remplace l'extension originale par .jpg*/

   file = await sharp(uploadedFile.data) /**resize si hauteur plus haut que 400 et converti en jp */ 
       .resize({
           height: 500, /**resize si hauteur plus haut que 500px*/
           width:600,/**resize si largeur plus haut que 600px*/
           withoutEnlargement: true /**Ne pas agrandir si la largeur ou la hauteur sont déjà inférieures aux dimensions spécifiées*/
       })
       .toFormat("jpeg") /**converti le fichier en jpg*/
       .jpeg({ quality: 90 })
       .toFile(`public/uploads/${fileName}`);

      await Visuels.create({
        nom_visuel: req.body.nom_visuel,
        image : fileName,
      


    });
    res.redirect('/visuels');

}




/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof visuelsController
 */
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

/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof visuelsController
 */
visuelsController.update = (req, res) => { // POST : visuels/update/:id
  //  console.log(req.body);

    Visuels.findOne({
        where: {id: req.params.id}
    }).then(visuels => {
        Visuels.update({
            nom_visuel: req.body.nom_visuel,
            image:req.body.image

          //  id_formats: Number(req.body.format_visuels),//choisir un format

        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/visuels'))
    })
}
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param - id: number
 * @memberof visuelsController
 */
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
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof visuelsController
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
