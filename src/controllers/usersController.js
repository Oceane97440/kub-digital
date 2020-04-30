const usersController = {};
const User = require('../models/users.js');
var Jwt = require('../jwt/utils');
var bcrypt = require('bcrypt');
var asyncLib = require('async');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

usersController.index = (req, res) => { // GET : /users

    res.render('users/signup', {
        title: "Page Users"
    })
}

usersController.create = (req, res) => { // POST : /users/create

    console.log(req.body);

    var nom = req.body.nom_user
    var prenom = req.body.prenom_user
    var email = req.body.email_user
    var password = req.body.password_user
    var profession = req.body.profession_user
    var telephone = req.body.telephone_user
    // var id_annonceurs = Number(req.body.user_annonceur) //choisir un annonceur

    //verifier c les champs ne son pas vide
    if (nom == null || prenom == null || email == null || password == null) {
        return res.send('il y a des infos manquantes' + '<a href="/users">Retour</a>')

    }

    //verif si email est valide avec le regex
    if (!EMAIL_REGEX.test(email)) {
        return res.send('mail pas valide' + '<a href="/users">Retour</a>')

    }
    //verif si le password contien entre min 4 et max 8 caratère + un nbr
    if (!PASSWORD_REGEX.test(password)) {

        return res.send('il faut au un mot de passe compris entre 4 et 8 caratère avec 1 chiffre' + '<a href="/users">Retour</a>')

    }
    asyncLib.waterfall([
        function (callback) {
            User.findOne({
                    //mail si il exsite déjà dans le bdd
                    attributes: ['email'],
                    where: {
                        email: email
                    }
                })
                //debut du waterfall valeur null car on passe à la function suivante
                .then(function (userFound) {
                    callback(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'unable to verify user'
                    });
                });
        },
        function (userFound, callback) {
            //verif si userFound exsite
            if (!userFound) {
                //hash le passeword
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    //waterfall pas terminer passe à la function suivante bcrypted
                    callback(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({
                    'error': 'user already exist'
                });
            }
        },
        function (userFound, bcryptedPassword, callback) {
            console.log(bcryptedPassword)
            //save le new user
            var newUser = User.create({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    password: bcryptedPassword,
                    profession: profession,
                    telephone: telephone,
                    //on dit que user inscrit n'est pas admin
                    role : 0
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
    ], function (newUser) {
        if (newUser) {
            return res.redirect('/users/login');

        } else {
            return res.status(500).json({
                'error': 'impossible add le user'
            });
        }
    });

}



usersController.login = (req, res) => { // GET : /users/login

    res.render('users/login', {
        title: "Page login"
    })
}

usersController.registre = (req, res) => { // POST : /users/registre

        //recup les valeur du body
        console.log(req.body.email_user)
        console.log(req.body.password_user)

        var email = req.body.email_user
        var password = req.body.password_user
        //verifie si les donnée son correcte 
        if (email == null || password == null) {
            return res.status(400).json({
                'error': 'parametre manquante'
            })
        }
        asyncLib.waterfall([
                function (callback) {
                    //verif si le mail est présent dans la base
                    User.findOne({
                        //on selection tout les atribut de utilisateur
                            where: {
                                email: email
                            }
                        })
                        .then(function (userFound) {
                            //même process que pour le 1er waterfall
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                'error': 'unable to verify user'
                            });
                        });
                },
                function (userFound, callback) {
                    if (userFound) {
                        //on verifie si l'utilisateur à utiliser le bon mot de passe
                        bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                            callback(null, userFound, resBycrypt);
                        });
                    } else {
                        //erreur si le mdo ou email n'est pas dans la base
                        return res.status(404).json({
                            'error': 'user not exist in DB'
                        });
                    }
                },
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
                    console.log(userFound.id)
                    console.log(Jwt.generateTokenForUser(userFound))
                    //   return res.status(201).json({
                    //       'userId': userFound.id,
                    //       'token': Jwt.generateTokenForUser(userFound)

                    //   });
                    User.findOne({
                        where: {
                            id: userFound.id
                        }

                    }).then(user => {
                        console.log(user)
                        res.render('users/profil', {
                            user: user,
                            title: "Page profil"
                        })
                    })

                } else {
                    return res.status(500).json({
                        'error': 'impossible de logé le user'
                    });
                }
            });
    },



    usersController.auth = (req, res) => { //GET : /users/auth
        console.log(req.headers['authorization'])
        console.log(Jwt.getUserId(headerAuth))
        //recup le header du token
        var headerAuth = req.headers['authorization'];
        var userId = Jwt.getUserId(headerAuth);

        //verif si userid n'est pas négatif test de sécurité
        if (userId < 0) {
            return res.status(400).json({
                'error': 'token incorrect'
            })
        }


        User.findOne({
            //chercher les éléments de la table utilisateurs qu'on souhaite récup
            attributes: ['id', 'nom', 'prenom', 'profession', 'telephone'],
            //recup les donnée userid du token
            where: {
                id: userId
            }


        }).then((user) => {
            if (user) {
                console.log(user);
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