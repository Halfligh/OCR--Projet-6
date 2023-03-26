const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  // Permet d'assurer que la sauce aura un nouvel id et ne réutilise pas l'id envoyé par le client
  delete sauceObject._id;

  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


exports.likeSauce = (req, res, next) => {
    const Sauce = require('../models/Sauce');

      const userId = req.body.userId; // Récupération de l'ID de l'utilisateur
      const like = req.body.like; // Récupération du statut "like" (-1, 0 ou 1)
      const sauceId = req.params.id; // Récupération de l'ID de la sauce concernée
    
      // Recherche de la sauce dans la base de données
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (!sauce) {
            return res.status(404).json({ error: 'Sauce non trouvée' });
          }
    
          // Si l'utilisateur a déjà noté la sauce, on retire son vote actuel de la
          // liste des votes (usersLiked ou usersDisliked) pour éviter les doublons
          if (sauce.usersLiked.includes(userId)) {
            sauce.likes--;
            const userIndex = sauce.usersLiked.indexOf(userId);
            sauce.usersLiked.splice(userIndex, 1);
          }
          if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes--;
            const userIndex = sauce.usersDisliked.indexOf(userId);
            sauce.usersDisliked.splice(userIndex, 1);
          }
    
          // Ajout du vote de l'utilisateur et mise à jour du nombre total de likes/dislikes
          switch (like) {
            case 1: // L'utilisateur aime la sauce
              sauce.likes++;
              sauce.usersLiked.push(userId);
              break;
            case -1: // L'utilisateur n'aime pas la sauce
              sauce.dislikes++;
              sauce.usersDisliked.push(userId);
              break;
            default: // L'utilisateur annule son vote
              break;
          }
    
          // Enregistrement de la sauce dans la base de données
          sauce
            .save()
            .then(() => res.status(200).json({ message: 'Vote enregistré' }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    };