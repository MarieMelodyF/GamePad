const express = require("express");
const cors = require("cors");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid = require("uid2");
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
// permet de recevoir formdata
const fileUpload = require("express-fileupload");
// encryptage du file
const converToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    // upload file
    console.log("req", req.files);
    const avatar = req.files.avatar;
    console.log(avatar);
    // save on cloudinary
    const result = await cloudinary.uploader.upload(converToBase64(avatar));
    console.log("result", result);

    // console.log(req.body);
    const existingMail = await User.findOne({ email: req.body.email });
    const existingUser = await User.findOne({ username: req.body.email });
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
        token: token,
        hash: hash,
        salt: salt,
        account: {
          username: req.body.username,
          avatar: result.secure_url,
        },
      });
      console.log(newUser);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        token: newUser.token,
        account: {
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.secure_url,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
