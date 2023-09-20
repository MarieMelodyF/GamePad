const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  token: { type: String },
  hash: { type: String },
  salt: { type: String },
  avatar_user: { type: Object },
  favoriteGame: { type: Array },
  Reviewsw: { type: Array },
});

module.exports = User;
