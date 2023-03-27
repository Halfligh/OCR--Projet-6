const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const { validateUserInput } = require('../middleware/validate-user-input');

router.post('/signup', validateUserInput, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;