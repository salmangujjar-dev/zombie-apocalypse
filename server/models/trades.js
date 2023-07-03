const mongoose = require("mongoose");

const tradesSchema = new mongoose.Schema(
  {
    inventory: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "inventories",
          required: true,
        },
        item: {
          type: String,
          required: true,
        },
        tradeQty: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    inventory1: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "inventories",
          required: true,
        },
        item: {
          type: String,
          required: true,
        },
        tradeQty: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    reqFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "survivors",
    },
    reqTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "survivors",
    },
    status: {
      type: String,
      required: true,
    },
  },
  { collection: "trades" }
);

const Trades = mongoose.model("trades", tradesSchema);

module.exports = { Trades };
