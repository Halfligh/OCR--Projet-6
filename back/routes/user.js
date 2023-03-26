const express = require('express');
const router = express.Router();

const User = require('../models/user');

const userCtrl = require('../controllers/user');

// router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.post('/signup', (req, res, next) => {
    const user = new User({
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
      .catch(error => res.status(400).json({ error }));
  });
  

module.exports = router;