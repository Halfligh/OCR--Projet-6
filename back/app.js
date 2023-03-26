const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require ('./routes/user.js')

// Connexion à MongoDB
mongoose.connect('mongodb+srv://sebastien:QW7xvFX8AibbXHrV@clusterprojet6.vptnk9y.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

// Autoriser les CORS - Permettre communication entre localhost:3000 et localhost:4200
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Utilisation du router User 
app.use('/api/auth', userRoutes);

module.exports = app;

// const helmet = require('helmet');
// const path = require('path');
// const rateLimit = require("express-rate-limit");

// const sauceRoutes = require('./routes/sauce');
// const userRoutes = require('./routes/user');
// const auth = require('./middleware/auth');
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });

// const app = express();

// // Configure helmet to secure Express app
// app.use(helmet());

// // Define the folder for static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Limit the number of requests for each IP
// app.use(limiter);

// MiddleWare qui intercepte tous les requêtes qui contiennent du JSON et nous mette à disposition le contenu de ces requêtes sur req.body
// app.use(express.json());

// // Auth middleware
// app.use(auth);

// // Routes
// app.use('/api/sauces', sauceRoutes);
// app.use('/api/auth', userRoutes);

// module.exports = app;