const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { verifyToken } = require("./middlewares");
const multer = require("multer");
const { Survivors } = require("../models/survivors");

const upload = multer();

const jsonParser = bodyParser.json();

router.put(
  "/api/v1/updateSurvivor/:id",
  upload.single("file"),
  verifyToken,
  async (req, res) => {
    profile_image = null;
    if (req.file) {
      profile_image = req.file.buffer;
    }

    const survivorObject = {
      ...JSON.parse(req.body.updatedSurvivorObj),
      profile_image,
    };
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
  }
);

router.post(
  "/api/v1/fetchProfile/:id",
  jsonParser,
  verifyToken,
  async (req, res) => {
    const _id = req.params.id;
    const survivor = await Survivors.findOne({ _id }, { password: 0 }).populate(
      "resources.item",
      "item"
    );

    if (survivor) {
      const body = survivor.toObject();
      const modifiedResources = body.resources.map((resource) => ({
        _id: resource.item._id,
        item: resource.item.item,
        quantity: resource.quantity,
      }));
      body.resources = modifiedResources;

      res.status(200).json({
        login: true,
        survivor: body,
      });
    } else {
      res.status(201).json({
        login: false,
        message: "Something went wrong.",
      });
    }
  }
);

module.exports = router;
