const usersController = {};
const User = require('../models/users.js');
//var jwt = require('jsonwebtoken');
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
    var id_annonceurs = Number(req.body.user_annonceur) //choisir un annonceur

    //verifier c les champs ne son pas vide
    if (nom == null || prenom == null || email == null || password == null) {
        return res.send('il y a des infos manquantes' + '<a href="/users">Retour</a>')

    }

    //verif si email est valide
    if (!EMAIL_REGEX.test(email)) {
        return res.send('mail pas valide' + '<a href="/users">Retour</a>')

    }
    //verif si le password contien entre min 4 et max 8 caratère + un nbr
    if (!PASSWORD_REGEX.test(password)) {

        return res.send('il faut au un mot de passe compris entre 4 et 8 caratère avec 1 chiffre' + '<a href="/users">Retour</a>')

    }
    asyncLib.waterfall([
        function (done) {
            User.findOne({
                    //mail si il exsite déjà dans le bdd
                    attributes: ['email'],
                    where: {
                        email: email
                    }
                })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                  });
        },
        function (userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        },
        function (userFound, bcryptedPassword, done) {
            console.log(bcryptedPassword)

            var newUser = User.create({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    password: bcryptedPassword,
                    profession: profession,
                    telephone: telephone,
                    id_annonceurs: id_annonceurs
                })
              
                .then(function (newUser) {
                    done(newUser);
                })
                .catch(function (err) {
                    return res.status(500).json({
                        'error': 'impossible add le user'
                    });
                });
        }], function(newUser) {
      if (newUser) {
        return res.redirect('/');

      } else {
        return res.status(500).json({ 'error': 'impossible add le user' });
      }
    });

}



usersController.login = (req, res) => { // GET : /users/login

    res.render('users/login', {
        title: "Page login"
    })
}

usersController.registre = (req, res) => { // GET : /users/registre
    var email = req.body.email
    var password = req.body.password

    if (email == null || password == null) {
        return res.status(400).json({
            'error': 'parametre manquante'
        })
    }
    User.findOne({
            where: {
                email: email
            }
        })
        .then(userFound => {
            if (userFound) {
                //bcrypte
            } else {
                return res.status(404).json({
                    'error': 'user no exist'
                })
            }

        })

}


/**
 * @method GET
 * @url /users/jsonList
 */
// usersController.jsonList = (req, res) => {
//     User.findAll().then(users => {
//         //  console.log(users);
//         try {
//             res.json({
//                 status: "OK",
//                 data: users,
//                 message: ""
//             })
//         } catch (error) {
//             res.json({
//                 status: "KO",
//                 message: error
//             })
//         }
//     })
// }
module.exports = usersController;