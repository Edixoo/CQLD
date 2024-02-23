# Configurer son environnement

### La base de données

Pour pouvoir lancer le site convenablement, il vous faudra choisir un hebergement local de base de données. Celle utilisé pour ce site est mongoDB. Plusieurs choix s'offrent à vous. C'est à vous de décider lequel choisir.

Une fois installé et lancé, allez récupérer l'url de connexion à la base de données et rendez vous dans le fichier .env contenu dans le repertoire nommé Back puis chercher le fichier .env.example, dupliquer le et supprimer le .example puis mettez votre lien de connexion suite au égal de la variable MONGODB_URI.

### Le .env du Back

L'API qui va se chercher de toutes les actions ainsi que des échanges avec la base de données doit avoir un port pour pouvoir communiquer avec le "Front" qui lui se charge de l'aspect du projet.

###### Le port de l'api

Une fois la base de données préparé nous pouvons nous concentrer sur le reste. Tout d'abord, il vous faut sélectionner un port pour l'api. Pensez y, les ports sont limités sur votre machine, renseignez vous avant de sélectionner n'importe quoi. Nous vous conseillons le port 3000 qui est souvent dédié pour vos propres API

###### La secret key

Celle ci doit être généré aléatoirement et surtout **PRIVÉ** c'est celle qui va gérer l'encodage de vos données comme les mots de passe et autres données sensibles. Le plus simple pour vous en procurer une est d'aller sur un site de génération de clé en AES 256 bits puis de la copier et de la coller dans sur la ligne correspondante.

###### La key mail

La key mail correspond à l'accès au mail qui sera chargé du support du site. Il est primordial de choisir un mail de confiance. Une fois choisi il vous faudra aller chercher la clé d'accès de ce mail. En fonction de l'hébergeur la méthode change, nous vous invitons à vous renseigner concernant le vôtre.


### Le .env du front


Une fois le .env du back rempli il vous faudra configurer celui du front. Comme dit précédemment c'est la partie qui se charge de l'aspect du site.


###### Le lien vers l'API

Pour faire communiquer les deux fonctionnalités. Il vous faut les relier et comment faire . C'est grâce au port de l'api que nous avons mis en place que nous allons identifier celle ci. Etant donné que notre API fonctionnera en local, nous allons utiliser le "localhost" c'est à dire l'identifiant de la machine. Pour avoir accès à l'API celle-ci correspondra à un lien: http://localhost:PORT_DE_VOTRE_API. Si celui ci ne marche nous pouvons utiliser l'IP correspondante à votre machine, le lien ressemblera donc à ça: http://127.0.0.1:PORT_DE_VOTRE_API

Une fois, sélectionner votre lien prêt, vous pouvez le mettre en suite de la variable VUE_APP_API_BASE_URL.

###### La secret key

Celle ci correspond à la même que l'API donc vous pouvez simplement vous rendre dans votre .env de votre back et copier coller le même.
