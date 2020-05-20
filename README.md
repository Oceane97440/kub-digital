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
Npm : https-errors express path cookie-parser morgan nodemon body-parser express-fileupload ejs sequelize sqlife mysql bcrypt jwt async jsdoc cookie-parser

# A faire:

-Avec Squelieze crée les relations entre les table: visuels /campagne (visuels_has_campagne):voir squelize
-Le budjet total s'ajoute lorsque le nombre impression augmente (cela depend du prix du format et quatiter)



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
-Template de hp login signup 
-Model crée user_has_campagne user_has_annonceur visuel_has_campagne
-Role admin =1 et user=0 + repartition des roles et actions (cf.user story)
-générer la doc avec jsdoc
-j'arrive a crée un cookie dans laquel le user id et token son stocké

# Prob
Squelize ne veut pas s'installer =resolue version du package
Le user ne s'enregistre pas dans la base de donné ,la methode bcrypte ne hash pas le mdp =resolu utiliser des fonction asynchrone avec waterfall
Le user apres login n'est pas rediriger vers sa page profil + avec les info liée a son compte=resolu grâce a un findOne de id user dans la route post registre
problème upload d'image "mv" undifiend pourtant la fuction est ascry enctype est présent comme le dossier uploads dans public =résolu
console.log(uploadfile) remplacer let par var uploadfile
Prob avec le token: la session d'un user n'est pas maintenu
Au vu du delais j'ai décider de crée et stocké le cookie dans le controller