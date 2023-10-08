const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const winstonLog = require("./middlewares/winston-config");

const userRoutes = require("./routes/user.js");
const sauceRoutes = require("./routes/sauce.js");
const path = require("path");

// Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://sebastien:QW7xvFX8AibbXHrV@clusterprojet6.vptnk9y.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

// Autoriser les CORS -
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //"*" permet d'accéder à l'api via n'importe quelle origine
  res.setHeader(
    //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    //permet d'envoyer des requêtes avec les méthodes mentionnées
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//ajoute plusieurs en-têtes HTTP pour augmenter la sécurité : empêche XSS, assure que req faîtes sur https, frameguard aide à lutter contre clickjacking etc
app.use(helmet());

//limite le nombre de requêtes à 10 pour la même IP en 15min - Appliqué uniquement sur les routes auth
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

app.use("/api/auth", limiter, userRoutes);
app.use("/api/sauces", sauceRoutes);

//Seulement pour le développement - Tester fonctionnement de winston - http://localhost:3000/test-error
app.get("/test-error", (req, res, next) => {
  next(new Error("Test error"));
});

// Journalisation avec Winston
app.use((err, req, res, next) => {
  winstonLog.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  next(err);
});

// Affichage des erreurs à la console
app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

// Envoi de la réponse d'erreur
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message:
      "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
  });
});

module.exports = app;
