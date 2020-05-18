var jwt = require('jsonwebtoken');
//se doit rester sur le serveur
const JWT_SIGN_SECRET='564dazdbgfeziufbezifbfzefay8995893214865fdezfhuyty56855985858zfzefzafezfgty';

module.exports={
     generateTokenForUser: function (userData) {
          console.log(userData)
          //on génère et sign notre token
         return jwt.sign({
          //payload donnée
          userId: userData.id,
          admin:userData.admin
          
         },
         JWT_SIGN_SECRET,
         //le token ne sera plus valide dans 1h
         {
              expiresIn:'1h'
         })
     },
     parseAuthorization: function(authorization) {
          //verif si la chaîne de caratère est non null si c le cas on laisse vide pour recup que le token 
          return (authorization != null) ? authorization.replace('Bearer','') : null;
     
     },
     getUserId: function(authorization) {
          //value par defaut
          var userId = -1;
          //module.exports.parseAuthorization: précise qu'on est dans le même module
          var token = module.exports.parseAuthorization(authorization);
          if(token != null) {
            try {
              var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
              if(jwtToken != null)
                userId = jwtToken.userId;
            } catch(err) { }
          }
          return userId;
        }




}