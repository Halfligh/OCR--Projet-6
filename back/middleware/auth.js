const jwt = require('jsonwebtoken');

// Vérifie l'authenticité du token d'authentification
module.exports = (req, res, next) => {
  try {
    // Récupère le token dans le header Authorization de la requête
    const token = req.headers.authorization.split(' ')[1];
    // Vérifie le token avec la clé secrète pour obtenir le payload (données utilisateur)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Récupère l'ID utilisateur dans le payload
    const userId = decodedToken.userId;
    // Vérifie que l'ID correspond à un utilisateur enregistré
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      // Si tout est valide, passe la requête au prochain middleware
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};