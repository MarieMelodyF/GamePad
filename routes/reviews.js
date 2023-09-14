const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

// import des models reviews et user
const Reviews = require("../models/Reviews");
const User = require("../models/User");
const isAuthenticaded = require("../middlewares/isAuthenticaded");

router.post("/games/:id/reviews", isAuthenticaded, async (req, res) => {
  const { title, reviews, id } = req.body;
  console.log("title=>", title);
  console.log("reviews=>", reviews);

  try {
    // const existingReviews = await Reviews.findOne({
    //   token: token,
    //   game_id: id,
    // });

    // console.log(existingReviews);
    // if (existingReviews) {
    //   return res
    //     .status(400)
    //     .json("you already publish a reviews for this game, sorry.");
    // } else {

    const newReviews = new Reviews({
      title: title,
      reviews: reviews,
      game_id: id,
      author: req.User,
    });
    //   console.log("newReviews =>", newReviews);
    await newReviews.save();
    res.status(200).json({
      title: newReviews.title,
      reviews: newReviews.reviews,
      game_id: newReviews.game_id,
      author: newReviews.req.User,
    });
    // }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
