const Sauce = require('../models/sauce');  /* importe notre shéma Thing */
const fs = require('fs');

exports.createSauce = (req, res, next) => {  /* Enregistrement des Things dans la base de données */
    const sauceObject = JSON.parse(req.body.thing);
    delete sauceObject._id;  /* pour supprimer l'id du corps de la requête (un autre est généré automatiquement par MongoDB) */
    const sauce = new Sauce({  /* on créer une nouvelle instance de notre model Thing */
      ...sauceObject,  /* correspond à    Title: req.body.title, description:  etc... grace à l'opérateur spread(...) */
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()  /* enregistre l'objet dans la base de donné */
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.modifySauce = (req, res, next) => {  /* Mettez à jour un Thing existant */
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })  /* le 2eme argument est l'objet modifié */
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {  /* Suppression d'un Thing */
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneSauce = (req, res, next) => {  /* Récupération d'un Thing spécifique *//* nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre */
    Sauce.findOne({ _id: req.params.id })  /* l'_id de l'objet en vente doit être le même que l'id de paramètre (/:id) */
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {  /* Récupération de la liste de Things en vente */
    Sauce.find()  /* autre méthode de notre model pour trouver nos objets dans la base de données */ 
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
        /* La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things */
};

