# kub-digital

# Intituler du projet
Il s'agit d'un site marchand qui permet au utilisateur inscrit, crée et diffuser sa campagne sur nos sites support. Il reçoit un récap.
de sa campagne qui lui indique le budget total à payer,le nombre impression. Un process d'achat avec sandox, paypal est envisageable


# Techno
Nodejs
Drawio
Mysql Phpmyadmin
ORM Squelise
Trello
Discord Slack
VS code
Google sheet
Npm : https-errors express path cookie-parser morgan nodemon body-parser express-fileupload ejs sequelize sqlife mysql bcrypt jwt async

# A faire:

-Upload une image
-Login user
-Role admin =1 et user=0 + repartition des roles et actions (cf.user story)
-Avec Squelieze crée les relations entre les table: visuels /campagne (visuels_has_campagne)
-Faire le lien etre annonceurs /user
-Cree le modèle commandes :id_user , id_annonceurs,id_visuels,id_campagne,nbr_impressions,budjet_total
-Recup les donnés de la campagne et affichier dans commande
-Le budjet total s'ajoute lorsque le nombre impression augmente (cela depend du prix du format et quatiter)
-Avoir un recap des toutes la commandes

# En cours
L'intendification + controller de securité mdp et pas le même utilisateur dans le bdd 

# Terminer
-Validation du projet :16/03/2020
-Planification des tâches:16/03/2020
-User story (discussion entre mon tuteur et c besoin)
-Dico de donnée
-Creaction du MCD UML
-Creaction de la bdd
-Creaction repo de base avec express generator (serveur/routes/controllers/views)
-Creaction dossier models: user annonceur campagne format site visuels
-Formulaire inscription
-CRUD :Add Update Delette : user annonceur campagne format site visuels
-Dans la bdd les relations avec les tables son fait
-Relation entre user et id annonceur est fait : le user peut choisir son annonceur: un autre methode est envisager
-Le user peut être enregistre avec un process de sécurité , mdp hashé par bycryte
-J'arrive à générer un token authentification avec jwt 28/04

# Prob
Squelize ne veut pas s'installer =resolue
Le user ne s'enregistre pas dans la base de donné ,la methode bcrypte ne hash pas le mdp =resolu
Le user apres login n'est pas rediriger vers sa page profil + avec les info liée a son compte