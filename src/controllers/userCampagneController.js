const usercampagneController = {};
const User = require('../models/users.js');
const Campagne = require('../models/campagnes');
var Jwt = require('../jwt/utils');
var asyncLib = require('async');

usercampagneController.index = (req, res) => { // GET : /user/campagne/



}


// usercampagneController.form_campagne = (req, res) => { // GET : /user/campagne/add



// }

usercampagneController.create = (req, res) => { // POST : /user/campagne/create
    //on indentifie le user  qui va crée une campagne
    var headerAuth = req.headers['authorization'];
    var userId = Jwt.getUserId(headerAuth);
    //params
    var nom_campagne = req.body.nom_campagne
    var date_d = req.body.date_d
    var date_f = req.body.date_f
    var statut = req.body.statut
    var id_formats = Number(req.body.format_campagne) //choisir un format
    var id_visuels = Number(req.body.visuel_campagne) //choisir votre visuel apres créaction
    var id_sites = Number(req.body.site_campagne)

    //verifier que la date de debut est sup à la date de fin

    asyncLib.waterfall([
        function (callback) {
            User.findOne({
                    //req qui pemet de recup le user qui possède id du token

                    where: {
                        id: userId
                    }
                })
                .then(function (userFound) {
                    //cascade continu
                    callback(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'user non vérifier'
                    });
                });
        },
        function (userFound, callback) {

            if (userFound) {
                Campagne.create({
                    //argument objet
                    nom_campagne: nom_campagne,
                    date_d: date_d,
                    date_f: date_f,
                    statut: statut,
                    id_formats: id_formats, //choisir un format
                    id_visuels: id_visuels, //choisir votre visuel apres créaction
                    id_sites: id_sites,
                    //liée la campagne avec id unique de user
                    UserId:userFound.id
                })

                .then(newCampagne=>{
                    callback(newCampagne)
                })

            } else {
                return res.status(500).json({
                    'error': 'user non trouvé'
                });
            }





        },


    ], function (newCampagne) {

    })


}


// usercampagneController.edit = (req, res) => { // GET : /user/campagne/edit:id



// }

// usercampagneController.update = (req, res) => { // POST : /user/campagne/update/:id
//     //  console.log(req.body);

// }

// usercampagneController.delete = (req, res) => { // GET : /user/campagne/delete/:id


// }

// /**
//  * @method GET
//  * @url /user/campagne/jsonList
//  */
// usercampagneController.jsonList = (req, res) => {
//     Campagne.findAll().then(campagnes => {
//         //  console.log(campagnes);
//         try {
//             res.json({
//                 statut: "OK",
//                 data: campagnes,
//                 message: ""
//             })
//         } catch (error) {
//             res.json({
//                 statut: "KO",
//                 message: error
//             })
//         }
//     })
// }

module.exports = usercampagneController;