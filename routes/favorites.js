const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

const User = require("../models/User");

router.post("/add-favorite", async (req, res) => {});

module.exports = router;
