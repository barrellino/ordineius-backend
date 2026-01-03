const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET PRODOTTI
router.get("/prodotti", async (req, res) => {
  const prodotti = await Product.find().sort({ category: 1, name: 1 });
  res.json(prodotti);
});

// ADD PRODOTTO
router.post("/prodotti", async (req, res) => {
  try {
    const { code, name, category } = req.body;

    if (!code || !name || !category) {
      return res.json({ success: false, message: "Dati mancanti" });
    }

    await Product.create({ code, name, category });
    res.json({ success: true });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: false, message: "Codice già esistente" });
    }
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// DELETE PRODOTTO
router.delete("/prodotti/:code", async (req, res) => {
  await Product.deleteOne({ code: req.params.code });
  res.json({ success: true });
});

module.exports = router;
