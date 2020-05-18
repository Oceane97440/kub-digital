var express = require('express');
var path = require('path');
var cors = require('cors')
var fileUpload = require('express-fileupload');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');



mainDir = __dirname;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(fileUpload({
  limits: {
    fileSize: 50 * 2000 * 2000
  }
  
}));

//Route pour uploads image
app.post('/uploads', function (req, res) {
  console.log(req.files.image_visuel.name); //requette.files.nom du file 


});
//HP
var indexRouter = require('./src/routes/indexRoute');
app.use('/', indexRouter);

//Users
var usersRouter = require('./src/routes/usersRoute');
app.use('/users', usersRouter);

//Admin
var adminRouter=require('./src/routes/adminRoute');
app.use('/admin',adminRouter);

//Campagnes
var campagneRouter=require('./src/routes/campagneRoute');
app.use('/campagne',campagneRouter);


//Formats
var formatRouter=require('./src/routes/formatRoute');
app.use('/admin/formats',formatRouter);

//Sites
var sitesRouter=require('./src/routes/sitesRoute');
app.use('/admin/sites',sitesRouter);


//Sites
var visuelsRouter=require('./src/routes/visuelsRoute');
app.use('/visuels',visuelsRouter);

//Annonceurs
var annonceursRouter=require('./src/routes/annonceursRouter');
app.use('/annonceurs',annonceursRouter);



/**
 * @MidleWare
 * UTILISATEUR CONNECTÉ
 */
// app.get('/*', function(req, res, next) {
//   res.locals.user = {}
//   if (req.session.user){
//     res.locals.user.nom = req.session.user.prenom; // nom de l'utilisateur connecté (dans le menu) accessible pour toutes les vues
//    // res.locals.user.role = req.session.user.role;
//     res.locals.user.id = req.session.user.id;
//   }
//   next();
// });
app.get('/logout',function(req,res){
  req.auth= false;
  req.token= null;
  res.redirect('/')
})














app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
