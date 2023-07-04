const mongoose = require("mongoose");

const inventoriesSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { collection: "inventories" }
);

const Inventories = mongoose.model("inventories", inventoriesSchema);

const seedData = [
  {
    item: "Fiji Water",
    points: 14,
  },
  {
    item: "Campbell Soup",
    points: 12,
  },
  {
    item: "First Aid Pouch",
    points: 10,
  },
  {
    item: "AK47",
    points: 8,
  },
];

const initializeSeeding = async () => {
  try {
    const count = await Inventories.countDocuments();
    count === 0 && (await Inventories.insertMany(seedData));
  } catch (err) {}
};

initializeSeeding();

module.exports = { Inventories };
