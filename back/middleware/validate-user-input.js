exports.validateUserInput = (req, res, next) => {

    // Regex format email et password à re-définir selon avis JT

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    // if (!emailRegex.test(req.body.email)) {
    //   return res.status(400).json({ error: 'Adresse email invalide' });
    // }
    // if (!passwordRegex.test(req.body.password)) {
    //   return res.status(400).json({ error: 'Mot de passe invalide (8 caractères minimum, au moins 1 lettre et 1 chiffre)' });
    // }
    
    // Vérification que la requête ne contient pas de balises script - même externes
    const regex = /<script>/gi;
        if (regex.test(req.body.email) || regex.test(req.body.password)) {
        return res.status(400).json({ error: 'Les balises script ne sont pas autorisées' });
        }

    next();
};
