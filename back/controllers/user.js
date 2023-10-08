const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: "Utilisateur créé !" });
    })
    .catch((error) => {
      if (error.code === 11000 || error.name === "MongoError") {
        // Vérifiez l'erreur liée à la violation d'unicité
        error = new Error("Vous ne pouvez pas créer un compte avec cet email");
        error.status = 409;
      }
      next(error); // Passez l'erreur au middleware suivant
    });
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw {
        status: 401,
        message: "Les informations d'authentification sont incorrectes",
      };
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw {
        status: 401,
        message: "Les informations d'authentification sont incorrectes",
      };
    }

    const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    res.status(200).json({
      userId: user._id,
      token: token,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Une erreur est survenue";
    const err = new Error(message);
    err.status = status;
    next(err); // Passez l'erreur au middleware suivant
  }
};
