const express = require("express");
const cors = require("cors");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid = require("uid2");

const app = express();
app.use(cors());
app.use(express.json());
// import model
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    console.log(req.body);
    const existingMail = await findOne({ email: req.body.email });
    const existingUser = await findOne({ username: req.body.email });
    if (existingMail) {
      res.status(400).json("Email alreaydy exist ! Use your account 😉");
    } else if (existingUser) {
      res
        .status(400)
        .json(
          " This username already exist ! Please, choose another username."
        );
    } else {
      const salt = uid(16);
      const token = uid(16);
      const saltedPassword = req.body.password + salt;
      const hash = SHA256(saltedPassword).toString(encBase64);
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        token: token,
        hash: hash,
        salt: salt,
      });
      console.log(newUser);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
