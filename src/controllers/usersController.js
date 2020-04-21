const usersController = {};
const User = require('../models/users.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

usersController.index = (req, res) => { // GET : /users

    res.render('users/signup', {
        title: "Page Users"
    })
}

usersController.create = (req, res) => { // POST : /users/create

    console.log(req.body);
    // User.create({
    //     nom: req.body.nom_user,
    //     prenom: req.body.prenom_user,
    //     email: req.body.email_user,
    //     password: req.body.password_user,
    //     profession: req.body.profession_user,
    //     telephone: req.body.telephone_user,
    //     id_annonceurs: Number(req.body.user_annonceur),//choisir un annonceur


    // }).then(res.redirect('/'))
    var nom = req.body.nom_user
    var prenom = req.body.prenom_user
    var email = req.body.email_user
    var password = req.body.password_user
    var profession = req.body.profession_user
    var telephone = req.body.telephone_user
    // var id_annonceurs = Number(req.body.user_annonceur) //choisir un annonceur

    //verifier c les champs ne son pas vide
    if (nom == null || prenom == null || email == null || password == null) {
        return res.status(400).json({'error': 'parametre manquante'})
    }

    //ajout du user dans la bdd
    User.findOne({
            //mail si il exsite
            attributes: ['email'],
            where: {
                email: email
            }
        })
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(password,5, function (err, bcrytedPassword) {
                    console.log(bcrytedPassword);
                    var newUser = User.create({

                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bcrytedPassword,
                        profession: profession,
                        telephone: telephone,

                    }).then(newUser=> {
                        console.log(newUser);
                        return res.status(201).json({
                            id:newUser.id
                        })
                    }).catch(err=>{
                        return res.status(500).json({'error':'impossible add user'})
                    })




                });
            }else{
                return res.status(409).json({'error':'user est crée'})
            }

        })


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
usersController.jsonList = (req, res) => {
    User.findAll().then(users => {
        //  console.log(users);
        try {
            res.json({
                status: "OK",
                data: users,
                message: ""
            })
        } catch (error) {
            res.json({
                status: "KO",
                message: error
            })
        }
    })
}
module.exports = usersController;