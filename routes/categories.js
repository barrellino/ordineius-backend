const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/categorie", async (req, res) => {
  const cats = await Category.find().sort({ name: 1 });
  res.json(cats);
});

router.post("/categorie", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ success: false });

  await Category.create({ name });
  res.json({ success: true });
});

module.exports = router;
