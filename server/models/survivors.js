const mongoose = require("mongoose");
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
  profile_image: {
    data: Buffer,
    contentType: String,
  },
  inventory: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items",
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
  const survivor = this;

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

const Survivors = mongoose.model("survivors", survivorSchema);

module.exports = { Survivors };
