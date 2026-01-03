require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use(require("./routes/auth"));
app.use(require("./routes/users"));
app.use(require("./routes/products"));
app.use(require("./routes/categories"));

// DB + START
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connesso");
    app.listen(process.env.PORT, () =>
      console.log("Server avviato su porta", process.env.PORT)
    );
  })
  .catch(err => console.error(err));
