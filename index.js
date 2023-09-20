const express = require("express"); // import du package express
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
require("dotenv").config();

// Connexion à mongoose
mongoose.connect(process.env.MONGODB_URI);
// ---------------
// ---------------

// import route Game Info
const homeRoute = require("./routes/home");
app.use(homeRoute);
// import route Login
const loginRoutes = require("./routes/login");
app.use(loginRoutes);
// import route Signup
const signupRoutes = require("./routes/signup");
app.use(signupRoutes);
// impor route reviews
const reviewsRoutes = require("./routes/reviews");
app.use(reviewsRoutes);

const MyCollection = require("./routes/favorites");
app.use(MyCollection);

// ---------------
// ---------------
// import middleware
const isAuthenticated = require("./middlewares/isAuthenticaded");
// import models User
const User = require("./models/User");
// ---------------
// ---------------
// routes de base
app.get("/", (req, res) => {
  try {
    res.status(200).json("Bienvenue sur le serveur GamePad ! ");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json("Cette page n'existe pas");
  } catch (error) {
    res.status(404).json({ message: error.response });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});
