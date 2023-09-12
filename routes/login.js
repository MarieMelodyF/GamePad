const express = require("express");
const cors = require("cors");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const app = express();
app.use(cors());
app.use(express.json());

// import du model
const User = require("../models/User");

router.post("/user/login", async (req, res) => {
  try {
    // trouver l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("foundUser ==>", foundUser);
    // comparer le password
    const comparePassword = req.body.password + foundUser.salt;
    const hash = SHA256(comparePassword).toString(encBase64);
    // si le password correspond a celui entrer lors du login, renvoyer les infos
    if (hash === foundUser.hash) {
      res.status(200).json({
        _id: foundUser._id,
        token: foundUser.token,
        username: foundUser.username,
      });
    } else {
      res
        .status(400)
        .json("Le mot de passe ou l'identifiant n'est pas correct.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
