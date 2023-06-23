const { Survivors } = require("../models/survivors");
const jwt = require("jsonwebtoken");

const checkUsernameExists = async (req, res, next) => {
  req.body.survivorObj = JSON.parse(req.body.survivorObj);
  const { username } = req.body.survivorObj;

  const existingSurvivor = await Survivors.findOne({ username });
  if (existingSurvivor) {
    return res.status(409).json({ message: "Survivor already exists" });
  } else {
    next();
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.body?.token || req.headers.token;
  if (token) {
    try {
      jwt.verify(token, "secretKey");
      next();
    } catch (err) {
      res.status(401).json({
        login: false,
      });
    }
  } else {
    res.status(400).json({
      login: false,
      data: "error",
    });
  }
};

module.exports = { checkUsernameExists, verifyToken };
