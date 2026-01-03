const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { userid, password, nome, cognome, email, telefono } = req.body;

    const exists = await User.findOne({ userid });
    if (exists) {
      return res.json({ success: false, message: "UserID già esistente" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const role = userid === "master" ? "master" : "user";

    await User.create({
      userid,
      nome,
      cognome,
      email,
      telefono,
      passwordHash,
      role
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;

    const user = await User.findOne({ userid });
    if (!user) {
      return res.json({ success: false, message: "Credenziali errate" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.json({ success: false, message: "Credenziali errate" });
    }

    res.json({ success: true, userid: user.userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
