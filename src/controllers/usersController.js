const usersController = {};
/**Export le modèle user */
const User = require('../models/users.js');
/**Export middlware */
var Jwt = require('../jwt/utils');
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
            /**Si le user a reussi à s'auth on génère son token auth */
            function (userFound) {
                if (userFound) {
                    console.log(userFound.id)
                    console.log(userFound.admin)
                    console.log(Jwt.generateTokenForUser(userFound))

                    User.findOne({
                        attributes: ['id', 'nom', 'prenom', 'profession', 'telephone', 'email'],
                        where: {
                            id: userFound.id,
                            admin: userFound.admin
                        }

                    }).then(user => {
                        //si le user est un admin rediriger vers la back-office
                        var admin = userFound.admin
                        if (admin === true) {
                            res.redirect('/admin')


                        } else {
                            //sinon vers une page profil utilisateur
                            res.redirect('/users/profil')

                        }



                    })

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
usersController.profil = (req, res) => {
    res.render('users/profil')
}


/**
 * Show the home page
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof usersController
 */
usersController.auth = (req, res) => { //GET : /users/auth
      console.log(req.headers['authorization'])
     console.log(Jwt.getUserId(headerAuth))

    /**recupère le header du token*/
    var headerAuth = req.headers['authorization'];
    var userId = Jwt.getUserId(headerAuth);

    User.findOne({
        /**chercher les éléments de la table utilisateurs qu'on souhaite récupérer*/
        attributes: ['id', 'nom', 'prenom', 'profession', 'telephone'],
        //recup les donnée userid du token
        where: {
            id: userId
        }
    }).then((user) => {
        if (user) {
            //  console.log(user);
            //si les info son correct affiche les donnés
            res.status(201).json(user)

        } //sinon error
        else {
            res.status(404).json({
                'error': 'user pas trouvé'
            })
        }
    }).catch((err) => {
        res.status(500).json({
            'error': 'impossible de recupérer le user'
        })
    });


}















module.exports = usersController;