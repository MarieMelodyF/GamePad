const mongoose = require("mongoose");

const Reviews = mongoose.model("Reviews", {
  title: { type: String },
  reviews: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = Reviews;
