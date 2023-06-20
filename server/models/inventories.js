const mongoose = require("mongoose");

const inventoriesSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { collection: "inventories" }
);

const Inventories = mongoose.model("inventories", inventoriesSchema);

module.exports = { Inventories };
