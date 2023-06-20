const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const jsonParser = bodyParser.json();

router.post("/api/v1/fetchSurvivorWithToken", jsonParser, async (req, res) => {
  const token = req.body.token;
  if (token) {
    try {
      const { survivor } = jwt.verify(token, "secretKey");
      delete survivor.password;
      res.status(200).json({
        login: true,
        data: { ...survivor, token },
      });
    } catch (err) {
      res.status(401).json({
        login: false,
      });
    }
  } else {
    res.status(201).json({
      login: false,
      data: "error",
    });
  }
});

module.exports = router;
