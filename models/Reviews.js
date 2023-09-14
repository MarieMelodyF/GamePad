const mongoose = require("mongoose");

const Reviews = mongoose.model("Reviews", {
  title: { type: String },
  reviews: { type: String },
  game_id: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = Reviews;
