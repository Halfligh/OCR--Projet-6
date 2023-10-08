exports.validateUserInput = (req, res, next) => {
  // Vérification que la requête ne contient pas de balises script - même externes
  const regex = /<script>/gi;
  if (regex.test(req.body.email) || regex.test(req.body.password)) {
    return res
      .status(400)
      .json({ error: "Les balises script ne sont pas autorisées" });
  }

  next();
};
