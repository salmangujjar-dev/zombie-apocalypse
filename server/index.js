require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {});

const authenticationController = require("./controllers/authenticationController");
const inventoryController = require("./controllers/inventoryController");
const survivorController = require("./controllers/survivorController");
const tradeController = require("./controllers/tradeController");

app.use(
  "/",
  authenticationController,
  inventoryController,
  survivorController,
  tradeController
);

app.listen(PORT);
