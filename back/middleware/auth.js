const jwt = require('jsonwebtoken');

// Vérifie l'authenticité du token d'authentification
module.exports = (req, res, next) => {
   try {
       // Récupère le token dans le header Authorization de la requête
       const token = req.headers.authorization.split(' ')[1];

       // Vérification du token avec la méthode verify
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};