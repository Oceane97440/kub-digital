var jwt = require('jsonwebtoken');
//se doit rester sur le serveur
const JWT_SIGN_SECRET='564dazdbgfeziufbezifby56855985858zfzefzafezfgty';

module.exports={
     generateTokenForUser: function (userData) {
          //on génère et sign notre token
         return jwt.sign({
          //payload
          userId: userData.id
          
         },
         JWT_SIGN_SECRET,
         //le token ne sera plus valide dans 1h
         {
              expiresIn:'1h'
         })
     }

}