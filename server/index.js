require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authenticationController = require("./controllers/authenticationController");
const inventoryController = require("./controllers/inventoryController");
const survivorController = require("./controllers/survivorController");
const tradeController = require("./controllers/tradeController");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => { });

app.use(bodyParser.json());
app.use("/api/v1/authentication", authenticationController);
app.use("/api/v1/survivor", survivorController);
app.use("/api/v1/inventory", inventoryController);
app.use("/api/v1/trade", tradeController);

app.listen(PORT);
