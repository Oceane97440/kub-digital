const visuelsController = {};
const Visuels = require('../models/visuels');
const path = require('path');
const sharp = require('sharp');
const validator = require('validator');
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof visuelsController
 */
visuelsController.index = (req, res) => { // GET :/visuels/
    //console.log(visuels);

    const headerAuth = req.headers['cookie'];

    /**Utilise la fonction split pour séparer le userid et le token */
    const token = headerAuth.split('=')
    var userId = token[0];
    if (userId <= 0) {
        return res.send('utilisateur non trouvé')
    }
    Visuels.findAll({
        where: {
            id_users: userId
        }

    }).then(visuels => {
        res.render('visuels/liste_visuels', {
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
visuelsController.create = async (req, res) => { // POST :/visuels/create
    const headerAuth = req.headers['cookie'];

    /**Utilise la fonction split pour séparer le userid et le token */
    const token = headerAuth.split('=')
    var userId = token[0];
    if (userId <= 0) {
        return res.send('utilisateur non trouvé')
    }


    var uploadedFile = req.files.image_visuel; // nom du champ image
    /**Verifie extention du fichier avant envoie */
    if (req.files) {
        console.log(req.files)
        if ((uploadedFile.mimetype == 'image/png') ||
            (uploadedFile.mimetype == 'image/jpg') ||
            (uploadedFile.mimetype == 'image/gif') ||
            (uploadedFile.mimetype == 'image/jpeg')) {} else {
            res.json({
                error: {
                    message: "Extention du fichier invalide"
                }
            });
        }
        /**Verifie si le fichier n'est pas > à 100ko */
        if (uploadedFile.size >= 90000) {
            // return res.send('Fichier volumineux')
            return res.json({
                result: alerte,
                error: {
                    message: "Fichier volumineux"
                }
            });

        } else {
            //  res.send('fichier upload')
            res.json({
                result: 'KO',
                success: {
                    message: "Fichier ajouté!"
                }
            });

        }


    } else {
        // return res.send('un problème est survenu. veuillez réessayer')
        return res.json({
            result: alerte,
            error: {
                message: "Un problème est survenu. veuillez réessayer"
            }
        });



    }


    /**il faut que le dossier upload existe... ;) */
    await uploadedFile.mv('public/uploads/' + uploadedFile.name, err => {
        if (err)
            return res.status(500).send(err)
    });

    fileName = path.parse(uploadedFile.name).name; /* remplace l'extension originale par .jpg*/

    file = await sharp(uploadedFile.data) /**resize si hauteur plus haut que 400 et converti en jp */
        .resize({
            height: 500,
            /**resize si hauteur plus haut que 500px*/
            width: 600,
            /**resize si largeur plus haut que 600px*/
            withoutEnlargement: true /**Ne pas agrandir si la largeur ou la hauteur sont déjà inférieures aux dimensions spécifiées*/
        })

        .toFile(`public/uploads/${fileName}`);


    await Visuels.create({
        nom_visuel: req.body.nom_visuel,
        image: fileName,
        id_users: userId


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
visuelsController.edit = (req, res) => { // GET :/visuels/edit:id


    Visuels.findOne({
        where: {
            id: req.params.id
        }

    }).then(visuel => {
        //console.log(visuel)
        res.render('visuels/edit_visuels', {
            visuel: visuel,
            title: "Edit visuels"
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
        where: {
            id: req.params.id
        }
    }).then(visuels => {
        Visuels.update({
            nom_visuel: req.body.nom_visuel,
            image: req.body.image_visuel


        }, {
            where: {
                id: req.params.id
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