const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb+srv://sebastien:QW7xvFX8AibbXHrV@clusterprojet6.vptnk9y.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Autoriser les CORS - Permettre communication entre localhost:3000 et localhost:4200
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.use('/api/sauces', (req, res, next) => {
  const sauces = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(sauces);
});

module.exports = app;

// const express = require('express');
// const mongoose = require('mongoose');
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

// Test requpete postman

// app.use((req, res, next) => {
//   console.log('Requête reçue ! ');
//   next();
// })

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// })

// app.use((req, res, next) => {
//   res.json({message : 'Votre requête à bien été reçue'});
//   next();
// })


// // Auth middleware
// app.use(auth);

// // Routes
// app.use('/api/sauces', sauceRoutes);
// app.use('/api/auth', userRoutes);

// module.exports = app;