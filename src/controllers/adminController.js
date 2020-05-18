const adminController = {};
const User = require('../models/users.js');
const Campagne = require('../models/campagnes');
const Visuels = require('../models/visuels');




adminController.index=(req,res)=>{// GET : /admin/
   
    User.findOne({
         attributes: ['id', 'nom', 'prenom', 'profession', 'telephone','email'],
         

     }).then(user => {
        res.render('admin/dashboard',{
            user: user,
            title: "Dashboard_admin"
        });console.log(user);
    }); 

}

adminController.utilisateurs=(req,res)=>{ // GET : /admin/utilisateurs

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
            profession: req.body.profession_user,
            telephone: req.body.telephone_user,
            statut:req.body.statut
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/admin/utilisateurs'))
    })
}

adminController.delete = (req, res) => { // GET : admin/delete/:id


    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/utilisateurs')
    })
}



adminController.campagne_admin = (req, res) => { // GET : admin/campagne/delete/:id

    Campagne.findAll().then(campagnes => {
        res.render('admin/liste_campagne', {
            campagnes: campagnes,
            title: "Listes des campagnes"
        });
    });

}

adminController.delete_campagne = (req, res) => { // GET : /admin/campagne/delete/:id

    Campagne.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/campagnes')
    })
}

adminController.visuels_admin = (req, res) => {

    Visuels.findAll().then(visuels => {
        res.render('admin/liste_visuels',{
            visuels: visuels,
           title: "Listes des visuels"
        });
    }); 
     

}

adminController.delete_visuels = (req, res) => { // GET : /admin/visuels/delete/:id

    Visuels.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin/visuels')
    })
}



module.exports = adminController;
