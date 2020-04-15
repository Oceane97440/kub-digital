const adminController = {};
const User = require('../models/users.js');


adminController.index=(req,res)=>{ // GET : /admin/

    User.findAll().then(users => {
        res.render('admin/liste_users',{
            users: users,
           title: "Liste Users"
        });console.log(users);
    }); 
     


}


adminController.edit=(req,res)=>{ // GET : /admin/edit:id

  
    User.findOne({
        where: {id: req.params.id}

    }).then(user => {
    console.log(user)
        res.render('admin/edit_users',{
           user: user,
           title:"Edit user"
        })
    })


}


adminController.update = (req, res) => { // POST : admin/update/:id
    console.log(req.body);

    User.findOne({
        where: {id: req.params.id}
    }).then(user => {
        User.update({
            nom: req.body.nom_user,
            prenom: req.body.prenom_user,
            email: req.body.email_user,
          //  password: req.body.password_user,
            profession: req.body.profession_user,
            telephone: req.body.telephone_user,
            id_annonceurs: Number(req.body.user_annonceur),//choisir un annonceur
            statut:req.body.statut
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/admin'))
    })
}

adminController.delete = (req, res) => { // GET : admin/delete/:id


    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin')
    })
}


/**
 * @method GET
 * @url /campagne/jsonList
 */







module.exports = adminController;
