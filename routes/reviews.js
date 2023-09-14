const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

// import des models reviews et user
const Reviews = require("../models/Reviews");
const User = require("../models/User");

// route all reviews
router.get("/allreviews", async (req, res) => {
  const { game_id } = req.body;
  try {
    const review = await User.find({
      game_id: game_id,
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

router.post("/publish/reviews", async (req, res) => {
  const { title, reviews, game_id, game_name } = req.body;
  //   console.log("title=>", title);
  //   console.log("reviews=>", reviews);

  try {
    // const existingReviews = await Reviews.findOne({
    //   token: token,
    //   game_id: game_id,
    // });

    // console.log(existingReviews);
    // if (existingReviews) {
    //   return;
    //   res
    //     .status(400)
    //     .json("you already publish a reviews for this game, sorry.");
    // } else {
    const reviewsAuthor = await User.findOne({ username });

    const newReviews = new Reviews({
      title: title,
      reviews: reviews,
      game_id: game_id,
      game_name: game_name,
      author: reviewsAuthor,
    });
    console.log("newReviews =>", newReviews);
    await newReviews.save();
    res.status(200).json({
      //   _id: newReviews._id,
      title: newReviews.title,
      reviews: newReviews.reviews,
      game_id: newReviews.game_id,
      game_name: newReviews.game_name,
      author: reviewsAuthor,
    });
    // }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
