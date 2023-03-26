exports.validateUserInput = (req, res, next) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: 'Adresse email invalide' });
    }
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({ error: 'Mot de passe invalide (8 caractères minimum, au moins 1 lettre et 1 chiffre)' });
    }
    
    // Vérification de la présence de balises script
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (regex.test(req.body.email) || regex.test(req.body.password)) {
      return res.status(400).json({ error: 'Les balises script ne sont pas autorisées' });
    }
  
    next();
  };