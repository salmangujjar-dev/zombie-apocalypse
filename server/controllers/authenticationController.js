const express = require("express");
const router = express.Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const { Survivors } = require("../models/survivors");
const checkUsernameExists = require("./middlewares");
const jwt = require("jsonwebtoken");

const upload = multer({ dest: "uploads/" });

const jsonParser = bodyParser.json();

router.post(
  "/api/v1/signup",
  upload.single("file"),
  checkUsernameExists,
  async (req, res) => {
    profile_image = null;
    if (req.file) {
      // const imagePath = path.resolve(
      //   __dirname,
      //   "../../uploads/" + req.file.filename
      // );

      // const imageData = fs.readFileSync(imagePath);
      profile_image = {
        fileName: req.file.filename,
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

router.post("/api/v1/login", jsonParser, async (req, res) => {
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

    const body = jwt.sign({ survivor }, "secretKey");
    delete body.password;
    res
      .status(200)
      .json({ ...body, token, message: "Logged in successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
