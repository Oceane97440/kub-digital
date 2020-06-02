var express = require('express');
var path = require('path');
var cors = require('cors')
var fileUpload = require('express-fileupload');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var session=require('express-session');
//var flash = require('connect-flash');


/** Utilisation de express dans notre serveur*/
var app = express();

/** view engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

/**Traite les donnée dans le corps de la requete */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
/**L'image à une limite min=50px max=2000px */
app.use(fileUpload({
  limits: {
    fileSize: 50 * 2000 * 2000
  }

}));
/**Express session middleware */
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
/**Express message middleware */
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });
/**Route pour uploads image*/
app.post('/uploads', function (req) {
  console.log(req.files.image_visuel.name); //requette.files.nom du file 


});
/**Racine du projet vers le routers home page */
var indexRouter = require('./src/routes/indexRoute');
app.use('/', indexRouter);

/**Route /users permet accéder à l'indentification et authentification d'un user */
var usersRouter = require('./src/routes/usersRoute');
app.use('/users', usersRouter);

/**Route vers le back-office */
var adminRouter = require('./src/routes/adminRoute');
app.use('/admin', adminRouter);

/**Route créaction campagne */
var campagneRouter = require('./src/routes/campagneRoute');
app.use('/campagne', campagneRouter);


/**Route créaction formats */
var formatRouter = require('./src/routes/formatRoute');
app.use('/admin/formats', formatRouter);

/**Route créaction sites */
var sitesRouter = require('./src/routes/sitesRoute');
app.use('/admin/sites', sitesRouter);


/**Route créaction visuels */
var visuelsRouter = require('./src/routes/visuelsRoute');
app.use('/visuels', visuelsRouter);

/**Route créaction annonceurs */
var annonceursRouter = require('./src/routes/annonceursRouter');
app.use('/annonceurs', annonceursRouter);

/**
 * @MidleWare
 * UTILISATEUR DECONNECTER
 */
app.get('/logout', function (req, res) {
  req.auth = false;
  req.token = null;
  res.redirect('/')
})


/**Le serveur ecoute sur le port 3000  */
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;