const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const sauceCtrl = require("../controllers/sauce");
const rateLimit = require("express-rate-limit");

//limite le nombre de creation de sauces à 5 pour la même IP en 20min
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 5,
});

router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, limiter, multer, sauceCtrl.createSauce);
router.put("/:id", auth, limiter, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
