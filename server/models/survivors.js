const mongoose = require("mongoose");
const { Inventories } = require("../models/inventories");
const bcrypt = require("bcrypt");

const survivorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  last_location: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  role: {
    type: String,
  },
  profile_image: {
    type: Buffer,
  },
  resources: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventories",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  isInfected: {
    type: Boolean,
    required: true,
  },
});

survivorSchema.pre("save", async function (next) {
  const { password } = this;

  const hash = await bcrypt.hash(password, 10);

  this.password = hash;
  next();
});

survivorSchema.methods.isValidPassword = async function (password) {
  const survivor = this;
  const compare = await bcrypt.compare(password, survivor.password);

  return compare;
};

const Survivors = mongoose.model("survivors", survivorSchema);

module.exports = { Survivors };
