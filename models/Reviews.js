const mongoose = require("mongoose");

const Reviews = mongoose.model("Reviews", {
  title: { type: String },
  reviews: { type: String },
  game_id: { type: String },
  token: { type: String },
  date: { type: Object },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: { type: String },
    _id: { type: String },
    avatar_user: { type: Object },
  },
});
module.exports = Reviews;
