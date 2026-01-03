const express = require("express");
const User = require("../models/User");

const router = express.Router();

// LISTA UTENTI (MASTER)
router.get("/users", async (req, res) => {
  const users = await User.find({}, "-passwordHash");
  res.json(users);
});

// INFO SINGOLO UTENTE
router.get("/user/:userid", async (req, res) => {
  const user = await User.findOne(
    { userid: req.params.userid },
    "-passwordHash"
  );
  if (!user) return res.status(404).json({});
  res.json(user);
});

module.exports = router;
