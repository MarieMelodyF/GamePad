const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

// import des models reviews et user
const Reviews = require("../models/Reviews");
const User = require("../models/User");
// import du middleware
const isAuthenticaded = require("../middlewares/isAuthenticaded");

// route post review
router.post("/games/reviews", isAuthenticaded, async (req, res) => {
  const { title, reviews } = req.body;
  // console.log("title=>", title);
  // console.log("reviews=>", reviews);
  // console.log("id", req.body.game_id);

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
      game_id: req.body.game_id,
      author: req.user,
    });
    await newReviews.save();
    res.status(200).json({
      title: newReviews.title,
      reviews: newReviews.reviews,
      game_id: newReviews.game_id,
      author: newReviews.author,
    });
    // }
  } catch (error) {
    console.log("=>", error.message);
  }
});

router.get("/allreviews/:id", async (req, res) => {
  const game_id = req.params.id;
  console.log("gameID =>", game_id);
  // console.log("req,body", req.body);
  // console.log("gameid-allreviews=>", game_id);
  try {
    if (game_id) {
      const allreviews = await Reviews.find({ game_id });
      res.status(200).json(allreviews);
      console.log("allreviews =>", allreviews); // Affiche les commentaires lié à l'id au jeu
    } else {
      res.status(200).json("allreviews2 =>", allreviews);
    }
  } catch (error) {
    console.log("error allreviews", error.message);
  }
});

module.exports = router;
