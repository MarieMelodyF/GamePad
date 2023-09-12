const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  mongoose.Schema({
    username: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    token: { type: String },
    hash: { type: String },
    salt: { type: String },
    favoritesComics: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  }) // récupèr les données dans mongoose
);

module.exports = User;
