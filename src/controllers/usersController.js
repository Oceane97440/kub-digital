const usersController = {};
/**Export le modèle user */
const User = require('../models/users.js');
/**Export middlware */
var Jwtutil = require('../middleware/utils');

var bcrypt = require('bcrypt');
/**Module async permet de traiter les fonction asynchrone  */
var asyncLib = require('async');

/**  Constants*/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

/**
 * Show the form signup
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof usersController
 */
usersController.index = (req, res) => { // GET : /users

    res.render('users/signup', {
        title: "Page Users"
    })
}

/**
 * Action créaction du user dans la bdd
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof usersController
 */
usersController.create = (req, res) => { // POST : /users/create

    // console.log(req.body);

    var nom = req.body.nom_user
    var prenom = req.body.prenom_user
    var email = req.body.email_user
    var password = req.body.password_user
    var profession = req.body.profession_user
    var telephone = req.body.telephone_user

    /**verifier si les champs ne son pas vide*/
    if (nom == null || prenom == null || email == null || password == null) {
        return res.send('il y a des infos manquantes' + '<a href="/users">Retour</a>')

    }

    /**verifie si email est valide avec le regex*/
    if (!EMAIL_REGEX.test(email)) {
        return res.send('mail pas valide' + '<a href="/users">Retour</a>')

    }
    /**verifie si le password contien entre min 4 et max 8 caratère + un number*/
    if (!PASSWORD_REGEX.test(password)) {

        return res.send('il faut au un mot de passe compris entre 4 et 8 caratère avec 1 chiffre' + '<a href="/users">Retour</a>')

    }
    /**
     * 
     * @constructor
     * @param {string} callback - début du waterfall
     */
    asyncLib.waterfall([
            function (callback) {
                User.findOne({
                        /**search si email exsite déjà dans le bdd*/
                        attributes: ['email'],
                        where: {
                            email: email
                        }
                    })
                    /**
                     * 
                     * @constructor
                     * @param {string} userFound - debut du waterfall valeur null car on passe à la function suivante*
                     */
                    .then(function (userFound) {
                        callback(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({
                            'error': 'unable to verify user'
                        });
                    });
            },
            /**
             * 
             * @constructor
             * @param {string} userFound - utilisateur trouvé
             * @param {string} callback - waterfall toujours en cours

             */
            function (userFound, callback) {
                /**verifie si userFound exsite*/
                if (!userFound) {
                    /**hash le password*/
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        /**waterfall pas terminer passe à la function suivante bcrypted*/
                        callback(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({
                        'error': 'user already exist'
                    });
                }
            },
            /**
            * 
            * @constructor
            * @param {string} userFound - utilisateur trouvé
            * @param {string} bcryptedPassword - password crypté
            * @param {string} callback - waterfall terminer

            */
            function (userFound, bcryptedPassword, callback) {
                //  console.log(bcryptedPassword)
                /**save the new user*/
                var newUser = User.create({
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bcryptedPassword,
                        profession: profession,
                        telephone: telephone,
                        /**on dit que user inscrit n'est pas admin*/
                        admin: 0
                    })

                    .then(function (newUser) {
                        //waterfall end 
                        callback(newUser);
                    })
                    .catch(function (err) {
                        return res.status(500).json({
                            'error': 'impossible add le user'
                        });
                    });
            }
        ],
        /**Apres l'enregistrement du user dans la bdd celui est rediriger vers la page de login */
        function (newUser) {
            if (newUser) {
                return res.redirect('/users/login');

            } else {
                return res.status(500).json({
                    'error': 'impossible add le user'
                });
            }
        });

}


/**
 * Show the login
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof usersController
 */
usersController.login = (req, res) => { // GET : /users/login

    res.render('users/login', {
        title: "Page login"
    })
}

/**
 * Show the login
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {object} next Express next object

 *
 * @memberof usersController
 */
usersController.registre = (req, res, next) => { // POST : /users/registre
        //  console.log(req.body.email_user)
        //  console.log(req.body.password_user)

        /**récupère les champs saisi */
        var email = req.body.email_user
        var password = req.body.password_user
        /**verifie si les donnée son correcte et non null */
        if (email == null || password == null) {
            return res.status(400).json({
                'error': 'parametre manquante'
            })
        }
        asyncLib.waterfall([
                function (callback) {
                    /**verifie si le mail est présent dans la base*/
                    User.findOne({
                            where: {
                                email: email
                            }
                        })
                        .then(function (userFound) {
                            /**même process que pour le 1er waterfall*/
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                'error': 'unable to verify user'
                            });
                        });
                },
                /**
                * 
                * @constructor
                * @param {string} userFound - utilisateur trouvé
                * @param {string} callback - waterfall terminer

                */
                function (userFound, callback) {
                    if (userFound) {
                        /**on verifie si l'utilisateur à utiliser le bon mot de passe*/
                        bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                            callback(null, userFound, resBycrypt);
                        });
                    } else {
                        /**erreur si le password ou email n'est pas dans la base*/
                        return res.status(404).json({
                            'error': 'user not exist in DB'
                        });
                    }
                },
                /**
                 * 
                 * @constructor
                 * @param {string} userFound - utilisateur trouvé
                 * @param {string} resBycrypt - password décrypté
                 * @param {string} callback - waterfall terminer

                */
                function (userFound, resBycrypt, callback) {
                    if (resBycrypt) {
                        //waterfall end
                        callback(userFound);
                    } else {
                        return res.status(403).json({
                            'error': 'invalid password'
                        });
                    }
                }
            ],
            function (userFound) {
                if (userFound) {
                   

                   var cookie = req.cookies.userId;
                    if (cookie === undefined) {

                        /**Si le user a reussi à s'auth on génère son token auth */
                        var Token = Jwtutil.generateTokenForUser(userFound);
                        var userId = userFound.id

                        var admin = userFound.admin
                        console.log(Token)
                        console.log(userId)
                        console.log(admin)
                        /**Stocke le cookie le id le token du user auth */

                         res.cookie(userId, Token, admin, {
                            maxAge: 3600000,
                            httpOnly: true
                        });
                        // return res.status(201).json({
                        //     'ID': userId,
                        //     'Token': Token,
                        //     'Admin': admin,


                        //   });
                        /**si le user est un admin rediriger vers la back-office */  
                        if (admin === true) {
                            return res.redirect('/users/admin')

                        } else {

                            return res.redirect('/users/auth')


                        }
                    } else {
                        // yes, cookie was already present 
                        console.log('cookie exists', cookie);
                    }


                } else {
                    return res.status(500).json({
                        'error': 'impossible de logé le user'
                    });
                }
            });
    },





    /**
     * Show the home page
     * @param {object} req Express request object
     * @param {object} res Express response object
     *
     * @memberof usersController
     */

    usersController.auth = (req, res) => { // Getting auth header

        console.log(req.headers)



        res.render('users/profil', {
            title: "Profil"
        })
        /**recupère le header du token*/
        // var headerAuth = req.headers['authorization'];
        // var userId = Jwtutil.getUserId(userId);
         console.log('Votre token='+ req.headers['cookie'])

        /**Vérifie si userId est < 0 si c'est la cas renvoir une erreur, cette erreur signifie que le userId na pas etait récupérer*/

            // if (userId < 0)
            //     return res.status(400).json({
            //         'error': 'User Id non définie userid=-1'
            //     });
        /**chercher les éléments de la table utilisateurs qu'on souhaite récupérer*/

    },


    usersController.admin = (req, res) => { // Getting auth header
        res.render('admin/dashboard', {
            title: "Back-office"
        })
        /**recupère le header du token*/
        // var headerAuth = req.headers['cookie'];
        console.log('Votre token='+ req.headers['cookie'])

        /**chercher les éléments de la table utilisateurs qu'on souhaite récupérer*/

      
    },








    module.exports = usersController;