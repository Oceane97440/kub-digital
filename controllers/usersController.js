const usersController = {};

usersController.index=(req,res)=>{


    res.render('users/signup', {
        title: "Page Users"
    })
}


module.exports = usersController;

