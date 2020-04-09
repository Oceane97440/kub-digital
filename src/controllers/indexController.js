const indexController = {};

indexController.index=(req,res)=>{


    res.render('index',{
        title:"HP"
    });

}


module.exports = indexController;
