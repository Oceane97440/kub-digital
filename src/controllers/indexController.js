const indexController = {};
/**
 * Show the home page
 * @param {object} req Express request object
 * @param {object} res Express response object
 *
 * @memberof indexController
 */
indexController.index=(req,res)=>{

/**renvoir vers le vue HP */
    res.render('index',{
        title:"HP"
    });

}


module.exports = indexController;
