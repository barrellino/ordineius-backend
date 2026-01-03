const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: { type: String, unique: true, required: true },
  nome: String,
  cognome: String,
  email: String,
  telefono: String,
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "master"], default: "user" }
});

module.exports = mongoose.model("User", UserSchema);
