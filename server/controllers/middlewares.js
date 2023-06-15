const { Survivors } = require("../models/survivors");

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

module.exports = checkUsernameExists;
