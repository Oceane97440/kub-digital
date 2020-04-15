const usersController = {};
const User = require('../models/users.js');

usersController.index=(req,res)=>{// GET : /users

    res.render('users/signup', {
        title: "Page Users"
    })
}

usersController.create = (req, res) => { // POST : /users/create
    console.log(req.body);
    User.create({
        nom: req.body.nom_user,
        prenom: req.body.prenom_user,
        email: req.body.email_user,
        password: req.body.password_user,
        profession: req.body.profession_user,
        telephone: req.body.telephone_user,
        id_annonceurs: Number(req.body.user_annonceur),//choisir un annonceur

    }).then(res.redirect('/'))
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
                statut: "OK",
                data: users,
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
module.exports = usersController;

