const express = require("express");
const router = express.Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const { Survivors } = require("../models/survivors");
const fs = require("fs");
const path = require("path");
const checkUsernameExists = require("./middlewares");

const upload = multer({ dest: "uploads/" });

router.post(
  "/api/v1/createSurvivor",
  upload.single("file"),
  checkUsernameExists,
  async (req, res) => {
    profile_image = null;
    if (req.file) {
      const imagePath = path.resolve(
        __dirname,
        "../../uploads/" + req.file.filename
      );

      const imageData = fs.readFileSync(imagePath);
      profile_image = {
        data: imageData,
        contentType: req.file.mimetype,
      };
    }

    survivorObj = req.body.survivorObj;

    const newSurvivor = new Survivors({
      ...survivorObj,
      profile_image,
    });
    const insertedSurvivor = await newSurvivor.save();
    return res
      .status(201)
      .json({ insertedSurvivor, message: "Survivor created successfully." });
  }
);

module.exports = router;
