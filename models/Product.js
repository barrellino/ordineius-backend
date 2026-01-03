const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
