var jwt = require('jsonwebtoken');
/** la cles secrète doit rester sur le serveur*/
const JWT_SIGN_SECRET = '564dazdbgfeziufbezifbfzefay8995893214865fdezfhuyty56855985858zfzefzafezfgty';

module.exports = {

     generateTokenForUser: function (userData) {
          console.log(userData)
          /**on génère et sign notre token*/
          return jwt.sign({
                    //payload continien donner userid et useradmin
                    userId: userData.id,
                    admin: userData.admin

               },
               JWT_SIGN_SECRET,
               //le token ne sera plus valide dans 1h
               {
                    expiresIn: '1h'
               })

          //console.log('MA CONST TOKEN:' + token)




     },
     parseAuthorization: function (authorization) {
          /**verifie si la chaîne de caratère est non null si c le cas on laisse vide pour recup que le token */
          return (authorization != null) ? authorization.replace('Bearer', '') : null;

     },
     getUserId: function (authorization) {
          /**value par defaut du user id*/
          var userId = -1;
          /**module.exports.parseAuthorization: précise qu'on est dans le même module*/
          var token = module.exports.parseAuthorization(authorization);
          if (token != null) {
               try {
                    var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                    if (err) {
                         //If error send Forbidden (403)
                         console.log('ERROR: Could not connect to the protected route');
                         res.sendStatus(403);
                    } else {
                         //If token is successfully verified, we can send the autorized data 
                         res.json({
                              message: 'Successful log in',
                         });
                    }
                    if (jwtToken != null)
                         userId = jwtToken.userId;
               } catch (err) {}
          }
          return userId;

     },





}