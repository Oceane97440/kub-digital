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
            statut:req.body.statut
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/admin'))
    })
}

adminController.delete = (req, res) => { // GET : admin/delete/:id

    // if (!req.session.user || req.session.user.role !== 1) {
    //     error = {status: '403',message: 'Permission non accordée'}
    //     return res.status(403).render('errors/index', {
    //         title:'Permission non accordée'
    //     });
    // }

    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin')
    })
}









module.exports = adminController;
