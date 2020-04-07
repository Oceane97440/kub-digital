const usersController = {};
const User = require('../models/users.js');

usersController.index=(req,res)=>{


    res.render('users/signup', {
        title: "Page Users"
    })
}

usersController.create = (req, res) => { // POST : /users/create
    User.create({
        nom: req.body.nom_user,
        prenom: req.body.prenom_user,
        email: req.body.email_user,
        password: req.body.password_user,
        profession: req.body.profession_user,
        telephone: req.body.telephone_user
    }).then(res.redirect('/'))
}


module.exports = usersController;

