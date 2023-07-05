const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const { verifyToken } = require("./middlewares");
const { Survivors } = require("../models/survivors");

const router = express.Router();
const upload = multer();
const jsonParser = bodyParser.json();

router.get("/", jsonParser, verifyToken, async (req, res) => {
  try {
    const { _id, input, inventory } = req.query;
    let result = null;
    if (input) {
      result = await Survivors.find(
        {
          name: { $regex: new RegExp(`^${input}`, "i") },
          _id: { $ne: { _id } },
          role: "survivor",
        },
        "_id name username profile_image"
      ).limit(10);
    } else {
      result = await Survivors.find(
        {
          resources: { $elemMatch: { $and: inventory } },
          _id: { $ne: { _id } },
          role: "survivor",
        },
        "_id name username profile_image"
      ).limit(10);
    }

    const body = await result.map((item) => item.toObject());
    res.status(200).json({ body });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.get("/report", verifyToken, async (req, res) => {
  try {
    const totalCount = await Survivors.countDocuments({ role: "survivor" });
    const infectedCount = await Survivors.countDocuments({
      isInfected: true,
      role: "survivor",
    });
    let avgItemQuantity = await Survivors.aggregate([
      {
        $match: {
          role: "survivor",
          isInfected: false,
        },
      },
      {
        $unwind: "$resources",
      },
      {
        $lookup: {
          from: "inventories",
          localField: "resources.item",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      { $unwind: "$itemDetails" },
      {
        $group: {
          _id: "$resources.item",
          itemDetails: { $first: "$itemDetails.item" },
          average: { $avg: "$resources.quantity" },
        },
      },
      { $project: { _id: 0 } },
    ]);

    let infectedPointLost = await Survivors.aggregate([
      {
        $match: {
          role: "survivor",
          isInfected: true,
        },
      },
      {
        $unwind: "$resources",
      },
      {
        $lookup: {
          from: "inventories",
          localField: "resources.item",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      { $unwind: "$itemDetails" },
      {
        $group: {
          _id: "$resources.item",
          itemDetails: { $first: "$itemDetails.item" },
          quantity: { $sum: "$resources.quantity" },
          points: { $first: "$itemDetails.points" },
        },
      },
      {
        $project: {
          _id: 0,
          itemDetails: 1,
          pointLost: {
            $multiply: ["$points", "$quantity"],
          },
        },
      },
    ]);

    avgItemQuantity = avgItemQuantity.map((obj) => {
      return Object.values(obj);
    });

    infectedPointLost = infectedPointLost.map((obj) => {
      return Object.values(obj);
    });

    res
      .status(200)
      .json({ totalCount, infectedCount, avgItemQuantity, infectedPointLost });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/:id", jsonParser, verifyToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const survivor = await Survivors.findOne({ _id }, { password: 0 }).populate(
      "resources.item tradeHistory",
      "item points inventory inventory1 reqFrom reqTo status"
    );
    const body = survivor.toObject();
    const modifiedResources = body.resources.map((resource) => ({
      _id: resource.item._id,
      item: resource.item.item,
      quantity: resource.quantity,
      points: resource.item.points,
    }));
    body.resources = modifiedResources;
    body.token = req.body.token || req.headers.token;

    res.status(200).json({
      login: true,
      survivor: body,
    });
  } catch (e) {
    res.status(400).json({
      login: false,
      message: "Survivor doesn't Exists.",
    });
  }
});

router.put("/report", jsonParser, verifyToken, async (req, res) => {
  try {
    const { victimId, targetId } = req.body;

    let response = await Survivors.updateOne(
      {
        _id: targetId,
        reportHistory: {
          $nin: [victimId],
        },
        reportCount: { $lt: 5 },
      },
      {
        $push: {
          reportHistory: victimId,
        },
        $inc: {
          reportCount: 1,
        },
      }
    );

    if (response.modifiedCount === 1) {
      await Survivors.updateOne(
        { _id: targetId, reportCount: 5 },
        { $set: { isInfected: true } }
      );
      res.status(200).json({ message: "Reported survivor Successfully!" });
    } else {
      res
        .status(400)
        .json({ message: "You have already reported this survivor!" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.put("/:id", upload.single("file"), verifyToken, async (req, res) => {
  profile_image = req.file?.buffer || null;

  const survivorObject = {
    ...JSON.parse(req.body.updatedSurvivorObj),
    ...(profile_image && { profile_image }),
  };

  try {
    const updatedSurvivor = await Survivors.updateOne(
      {
        username: survivorObject.username,
      },
      {
        $set: {
          ...survivorObject,
        },
      }
    );
    res.status(201).json({ updatedSurvivor });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;
