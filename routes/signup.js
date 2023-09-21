const express = require("express");
const cors = require("cors");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid = require("uid2");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json());
// import model
const User = require("../models/User");

// Cloudinary acces
cloudinary.config({
  cloud_name: process.env.CLOUDINARY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// encryptage du file
const converToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    // upload file
    const pictureToUpload = req.files.avatar;
    // console.log(pictureToUpload);
    // save on cloudinary
    const result = await cloudinary.uploader.upload(
      converToBase64(pictureToUpload)
    );
    // console.log("result", result);

    // console.log(req.body);
    const { email, username, password } = req.body;

    const existingMail = await User.findOne({ email: req.body.email });
    const existingUser = await User.findOne({ username: req.body.email });
    if (existingMail) {
      res.status(400).json("Email alreaydy exist ! Use your account 😉");
    }
    if (existingUser) {
      res
        .status(400)
        .json(
          " This username already exist ! Please, choose another username."
        );
    }
    if (!email || !username || !password) {
      res.status(400).json("You must fill in all the fields");
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
        avatar_user: {
          secure_url: result.secure_url,
        },
      });
      // console.log(newUser);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
        avatar_user: newUser.avatar_user,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.response });
    console.log(error);
  }
});
module.exports = router;
