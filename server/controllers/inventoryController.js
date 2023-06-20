const express = require("express");
const router = express.Router();
const { Inventories } = require("../models/inventories");

const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.post("/api/v1/addInventory", jsonParser, async (req, res) => {
  try {
    const newInventory = new Inventories({ ...req.body });
    const insertedInventory = await newInventory.save();
    res.status(201).json({ insertedInventory });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/api/v1/getInventory", jsonParser, async (req, res) => {
  try {
    const inventory = await Inventories.find({}, { item: 1 });
    const updatedInventory = inventory.map((item) => {
      const plainItem = item.toObject();
      plainItem.quantity = 0;
      return plainItem;
    });
    res.status(200).json({ updatedInventory });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
