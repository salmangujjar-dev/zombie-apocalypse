const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const jsonParser = bodyParser.json();

router.put(
  "/api/v1/updateSurvivor/:id",
  jsonParser,
  verifyToken,
  async (req, res) => {}
);

router.get("/api/v1/getSurvivor", verifyToken, jsonParser);

module.exports = router;
