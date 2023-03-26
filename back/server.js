const http = require('http');
const app = require('./app');

// Renvoit un port valide, qu'il soit fournit sous forme de numéro ou de chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// Recherche et traite les éventuelles erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du server et de l'écouteur d'événement sur le port
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);



// const http = require('http');
// const app = require('./app')

// // Connexion à MongoDB
// mongoose.connect('mongodb+srv://sebastien:QW7xvFX8AibbXHrV@clusterprojet6.vptnk9y.mongodb.net/?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));




// app.set('port', process.env.PORT || 3000)
// const server = http.createServer(app);

// server.listen(process.env.PORT || 3000);










// const port = process.env.PORT || 3000;
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('../back/routes/user');

// // Ajouter les middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Connexion à MongoDB
// mongoose.connect('mongodb+srv://sebastien:QW7xvFX8AibbXHrV@clusterprojet6.vptnk9y.mongodb.net/?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

// // Définir les routes pour les utilisateurs
// app.use('/api/users', userRoutes);

// // Définir les routes pour les autres ressources
// // app.use('/api/other', otherRoutes);

// // Gérer les erreurs 404
// app.use((req, res, next) => {
//   const error = new Error('Ressource non trouvée');
//   error.status = 404;
//   next(error);
// });

// // Gérer les erreurs
// app.use((error, req, res, next) => {
//   res.status(error.status || 500).json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// app.listen(port, () => {
//   console.log(`Serveur en cours d'exécution sur le port ${port}`);
// });