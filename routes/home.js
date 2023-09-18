const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

console.log(process.env.API_KEY_GAME);
// ALL GAMES
router.get("/home", async (req, res) => {
  const pageSize = req.query.page_size || "";
  const page = req.query.page || 1;
  const search = req.query.search || "";
  const order = req.query.order || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY_GAME}&page_size=${pageSize}&search=${search}&page=${page}&ordering=${order}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GAME INFO ID
router.get("/games/:id", async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY_GAME}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// SAME GAMES
router.get("/game/:id/similar", async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/game-series?key=${process.env.API_KEY_GAME}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// SCREENSHOT OF GAMES
router.get("/game/:id/screenshots", async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.API_KEY_GAME}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// TRAILER GAME
router.get("/game/:id/trailer", async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/movies?key=${process.env.API_KEY_GAME}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
