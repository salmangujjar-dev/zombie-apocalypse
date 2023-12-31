const express = require("express");

const { verifyToken } = require("./middlewares");
const { Trades } = require("../models/trades");
const { Survivors } = require("../models/survivors");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { reqFrom, reqTo } = req.body;
    const trade = await Trades.findOne({
      reqFrom: { $in: [reqFrom, reqTo] },
      reqTo: { $in: [reqFrom, reqTo] },
      status: "Pending",
    });

    if (trade) {
      res.status(400).json({ message: "You already have a pending trade." });
      return;
    }

    const newTrade = new Trades(req.body);
    const { _id } = await newTrade.save();

    await Survivors.updateMany(
      { _id: { $in: [reqFrom, reqTo] } },
      {
        $push: {
          tradeHistory: _id,
        },
      }
    );

    res.status(200).json({
      message: "Trade Request success!",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    await Trades.updateOne(
      {
        _id: req.body.tradeId,
        status: "Pending",
      },
      { $set: { status: req.body.status } }
    );

    if (req.body.status === "Accepted") {
      const { tradeObj } = req.body;
      let modifiedResources = tradeObj.inventory.map((item) => {
        const matchingObj = tradeObj.inventory1.find(
          (item1) => item1._id === item._id
        );
        return {
          item: item._id,
          quantity: item.quantity + matchingObj.tradeQty,
        };
      });

      await Survivors.updateOne(
        { _id: tradeObj.reqFrom },
        {
          $set: {
            resources: modifiedResources,
          },
        }
      );

      modifiedResources = tradeObj.inventory1.map((item) => {
        const matchingObj = tradeObj.inventory.find(
          (item1) => item1._id === item._id
        );
        return {
          item: item._id,
          quantity: item.quantity + matchingObj.tradeQty,
        };
      });

      await Survivors.updateOne(
        { _id: tradeObj.reqTo },
        {
          $set: {
            resources: modifiedResources,
          },
        }
      );
    }

    res.status(200).json({
      message:
        req.body.status === "Rejected"
          ? "Trade Request Rejected!"
          : "Trade Accepted!",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
