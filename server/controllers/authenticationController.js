const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const { Survivors } = require("../models/survivors");
const { checkUsernameExists } = require("./middlewares");

const router = express.Router();
const upload = multer();

router.post(
  "/signup",
  upload.single("file"),
  checkUsernameExists,
  async (req, res) => {
    profile_image = req.file?.buffer || null;

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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const survivor = await Survivors.findOne({ username });
    if (!survivor) {
      res.status(401).json({ message: "Survivor does not exist!" });
    }

    const validate = await survivor.isValidPassword(password);
    if (!validate) {
      res.status(401).json({ message: "Invalid Password!" });
    }

    const obj = {
      _id: survivor._id,
      role: survivor.role,
    };
    const token = jwt.sign({ _id: obj._id }, "secretKey");
    res.status(200).json({ ...obj, token, message: "Logged in successfully!" });
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
