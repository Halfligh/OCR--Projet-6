const jwt = require("jsonwebtoken");

//Définition du middleware
module.exports = (req, res, next) => {
  try {
    //Récupération du token : généralement envoyé dans un header appelé "Authorization" avec un format comme Bearer TOKEN_VALUE. Ce code extrait la partie TOKEN_VALUE du header.
    const token = req.headers.authorization.split(" ")[1];
    //Méthode verify de jsonwebtoken pour vérifier le token. Elle nécessite le token lui-même et une clé secrète pour décoder le token. Ici, la clé secrète est 'RANDOM_TOKEN_SECRET', mais dans un contexte réel, cette clé devrait être un secret complexe et non exposé.
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //Récupération de l'userId du token décodé
    const userId = decodedToken.userId;
    //Ajout de l'information d'authentification à l'objt req, permet aux autres middleware et aux routes d'y avoir accès
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
