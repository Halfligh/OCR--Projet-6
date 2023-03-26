const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Vérifier que l'email est unique avec le plugin uniqueValidator 
userSchema.plugin(uniqueValidator);

// Exporter le modèle User
module.exports = mongoose.model('User', userSchema);