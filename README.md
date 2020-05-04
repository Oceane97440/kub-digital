# kub-digital

# Intituler du projet
Il s'agit d'un site marchand qui permet au utilisateur inscrit, crée et diffuser sa campagne sur nos sites support. Il reçoit un récap.
de sa campagne qui lui indique le budget total à payer,le nombre impression. Un process d'achat avec sandox, paypal est envisageable


# Techno
lucidchart :diagrame gantt uml
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

-Role admin =1 et user=0 + repartition des roles et actions (cf.user story)
-Avec Squelieze crée les relations entre les table: visuels /campagne (visuels_has_campagne)
-Faire le lien etre annonceurs /user
-Cree le modèle commandes :id_user , id_annonceurs,id_visuels,id_campagne,nbr_impressions,budjet_total
-Recup les donnés de la campagne et affichier dans commande
-Le budjet total s'ajoute lorsque le nombre impression augmente (cela depend du prix du format et quatiter)
-Avoir un recap des toutes la commandes
-Avoir les staus de la commande quand le date de debut est < campagne pas encore diffuser
date de diff >=


# En cours
-Enregistrer son id dans une session et pouvoir accés a se profil dans le menu 
-Deconnexion

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
-Le user est rediriger vers sa page profile
L'intendification + controller de securité mdp et pas le même utilisateur dans le bdd 
-Upload une image 4/04

# Prob
Squelize ne veut pas s'installer =resolue version du package
Le user ne s'enregistre pas dans la base de donné ,la methode bcrypte ne hash pas le mdp =resolu utiliser des fonction asynchrone avec waterfall
Le user apres login n'est pas rediriger vers sa page profil + avec les info liée a son compte=resolu grâce a un findOne de id user dans la route post registre
problème upload d'image "mv" undifiend pourtant la fuction est ascry enctype est présent comme le dossier uploads dans public =résolu
console.log(uploadfile) remplacer let par var uploadfile