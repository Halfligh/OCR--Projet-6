const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: 'TOKEN'
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

// exports.deleteUser = (req, res, next) => {
//   User.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
//     .catch(error => res.status(400).json({ error }));
// };

// exports.modifyUser = (req, res, next) => {
//   const user = new User({
//     _id: req.params.id,
//     email: req.body.email,
//     password: req.body.password
//   });
//   User.updateOne({ _id: req.params.id }, user)
//     .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
//     .catch(error => res.status(400).json({ error }));
// };

// exports.getOneUser = (req, res, next) => {
//   User.findOne({ _id: req.params.id })
//     .then(user => res.status(200).json(user))
//     .catch(error => res.status(404).json({ error }));
// };

// exports.getAllUsers = (req, res, next) => {
//   User.find()
//     .then(users => res.status(200).json(users))
//     .catch(error => res.status(400).json({ error }));
// };