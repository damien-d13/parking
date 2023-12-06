# Partie 1
## Installation et utilisation du code envoyé
- Premièrement, dézippez l'application envoyé
- Vous devez avoir npm & node d'installé.
- Vous devez avoir démarré votre conteneur mongodb (avec Docker)
- Exécutez en ligne de commande dans le dossier (CTRL+ù dans VSCode) les commandes suivantes :
```
npm install
```
- Puis
```
node server.js
```
- L'application est démarrée

## Exercice à réaliser sur postman (ou via requêtes curl)
- Pour plus d'informations sur l'api, référez vous à la 
![capture suivante](express-tutorial-http-infos.png)
- Vous devez réaliser les requêtes http permettant de :
    - Insérer trois nouveau tutoriel
    - Récupérer tous les tutoriels
    - Récupérer un tutoriel par son ID
    - Récupérer un tutoriel avec un filtre de contenance sur le titre
    - Modifier un tutoriel existant
    - Supprimer un tutoriel par son ID
    - Supprimer tous les tutoriels (vous pouvez réexécuter vos insertions après)
    - Récupérer tous les tutoriels publiés (Attention, vous devez spécifier vous même le published à la création pour en trouver)

## Analysez le contenu de l'application
- Vous allez devoir réaliser par la suite un code similaire à celui qui est proposé, prenez le temps de l'analyser.

# Partie 2 : 
- Réaliser une application node permettant de mettre à disposition un serveur à l'écoute pour gérer les parkings sur lesquels nous avons déjà travaillé
- Votre application ressemblera grandement à celle proposée en partie 1 mais à vous de la réaliser.
- N'hésitez pas à vous aider du code proposé dans la partie 1 !

## Initialiser le projet et les dépendances
- Mettez-vous dans un nouveau dossier appelé par exemple "nodejs_express_mongo".
- Depuis le terminal (CTR+ù dans VSCode) lancez la commande :
``` npm init ```
- Rentrez les informations demandés au fur et à mesure. La seule importante est "entry point", mettez server.js (même si ça marcherait avec un index.js). Puis mettez yes.
- Il nous faut les modules express, mongoose et cors, faites donc la commande
``` npm install express mongoose cors --save ```

## Setup le serveur web express
- Dans le dossier parent, créez un fichier server.js (s'il n'a pas été créer automatiquement) puis réalisez les opérations pour setup la base express.
- Importer express & cors
- Créer une app express
- Définir une route GET qui est un simple test
- Ecouter sur le port 8080 pour les requêtes entrantes
- Maintenant démarrez votre app avec la commande 
```shell
node server.js
```
- Ouvrez votre navigateur à l'url http://localhost:8080/

## Configurer MongoDB database & Mongoose
- Dans le dossier app, créer une config séparée pour db.config.js comme _a : 
```js
module.exports = {
  url: "mongodb://localhost:27017/parkings"
};
```

## Définir Mongoose
- Créer app/models/index.js
- N'oubliez pas d'appeler la méthode connect dans server.js 

## Définir le model mongoose
- Dans le dossier models créer parking.model.js :

```js 
module.exports = mongoose => {
  const parking = mongoose.model(
    "parking",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return parking;
};
```
- Ce model mongoose represente la collection parking dans la base. Certains champs vont être crée automatiquement : _id, title, description, Document, createdAt, updatedAt, __v.
- Après avoir fini ces étapes, vous pouvez réaliser les opérations CRUD suivantes (Mongoose model les supporte et on les appelera depuis notre controlleur) : 
    - Créer un nouveau parkning : object.save()
    - Trouver un parking : findById(id)
    - Récupérer tous les parkings: find()
    - Modifier un parking par son Id: findByIdAndUpdate(id, data)
    - Supprimer par son Id: findByIdAndRemove(id)
    - Supprimer tous les parkings: deleteMany()
    - Trouver tous les parkings par leur titre: find({ title: { $regex: new RegExp(title), $options: “i” } })

## Création du controlleur
- Dans app/controllers, créer un parking.controller.js avec les opérations CRUD suivantes : 
    - create
    - findAll
    - findOne
    - update
    - delete
    - deleteAll
    - findAllWorked

## Définir les routes
- Quand un client envoie une requête pour un endpoint en utilisant une HTTP request, on a besoin de déterminer sur le serveur va répondre en mettant en place des routes. 
- Voici les routes dont on a besoin : 
    - /api/parkings: GET, POST, DELETE
    - /api/parkings/:id: GET, PUT, DELETE
    - /api/parkings/worked: GET
- Créer un parking.routes.js dans app/routes folder.
- On a besoin de faire le use de controllers/parking.controller.js
- On a aussi besoin d'inclure la route dans server.js (juste avant app.listen())

## Testez votre API !
- A vous de tester, vérifier que les étapes de la partie 1 fonctionnent également sur votre application ! 

    -Insérer trois nouveau parkings
    db.parkings.insertMany([
  { "title": "Parking 11", "description": "50 place", "worked": true },
  { "title": "Parking 12", "description": "30 place", "worked": false },
  { "title": "Parking 13", "description": "40 place", "worked": true }
])

    - Récupérer tous les parkings:
    db.parkings.find().pretty()

    - Récupérer un parking par son ID:
    db.parkings.find({ _id: ObjectId("5f9b2b3b9b0b9b1b9b9b9b9b") })

    - Récupérer un parking avec un filtre de contenance sur le titre:
    db.parkings.find({ title: { $regex: new RegExp("Parking 1"), $options: "i" } })

    - Modifier un parking existant:
    db.parkings.updateOne(
      { _id: ObjectId("5f9b2b3b9b0b9b1b9b9b9b9b") },
      { $set: { title: "Parking 1", description: "50 place", worked: true } }
    )

    - Supprimer un parking par son ID:
    db.parkings.deleteOne({ _id: ObjectId("5f9b2b3b9b0b9b1b9b9b9b9b") })

    - Supprimer tous les parkings (vous pouvez réexécuter vos insertions après):
    db.parkings.deleteMany({})

    - Récupérer tous les parking worked:
    db.parkings.find({ worked: true }).pretty()


# fixtures :    
```js 
    db.tutorials.insertMany([
  {
    title: "Parking 1",
    description: "Ceci est la description du premier Parking.",
    worked: true,
  },
  {
    title: "Parking 2",
    description: "Ceci est la description du deuxième Parking.",
    worked: false,
  },
  {
    title: "Parking 3",
    description: "Ceci est la description du troisième Parking.",
    worked: true,
  },
  {
    title: "Parking 4",
    description: "Ceci est la description du quatrième Parking.",
    worked: false,
  },
  {
    title: "Parking 5",
    description: "Ceci est la description du cinquième Parking.",
    worked: true,
  },
  {
    title: "Parking 6",
    description: "Ceci est la description du sixième Parking.",
    worked: false,
  },
  {
    title: "Parking 7",
    description: "Ceci est la description du septième Parking.",
    worked: true,
  },
  {
    title: "Parking 8",
    description: "Ceci est la description du huitième Parking.",
    worked: false,
  },
  {
    title: "Parking 9",
    description: "Ceci est la description du neuvième Parking.",
    worked: true,
  },
  {
    title: "Parking 10",
    description: "Ceci est la description du dixième Parking.",
    worked: false,
  },
]);
```
