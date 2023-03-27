const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const winstonLog = require('./middleware/winston-config');

const userRoutes = require('./routes/user.js')
const sauceRoutes = require('./routes/sauce.js')
const path = require('path');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://sebastien:QW7xvFX8AibbXHrV@clusterprojet6.vptnk9y.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

// Gestion de la ressource image de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// MiddleWare qui intercepte tous les requêtes qui contiennent du JSON et nous mette à disposition le contenu de ces requêtes sur req.body
app.use(express.json());

// Autoriser les CORS - Permettre communication entre localhost:3000 et localhost:4200
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation des middlewares
app.use(bodyParser.json());

// Configuration en-têtes HTTP, tels que CSP, X-XSS-Protection, X-Frame-Options, etc
app.use(helmet());

// Limite le nombre de requêtes pour chaque adresse IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware pour vérifier le fonctionnement de Winston : accéder à URL /test-error --> déclenche erreur avec le message 'Test error' qui sera ensuite capturée par Winston.
app.get('/test-error', (req, res, next) => {
  next(new Error('Test error'));
});

// Centralisation de toutes les erreurs et passage à la console en direct
app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

// Utilisation de winston pour journaliser les erreurs
app.use((err, req, res, next) => {
  winstonLog.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.' });
});

// Utilisation des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;