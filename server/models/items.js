const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const items = mongoose.model("items", itemSchema);

module.exports = { items };
