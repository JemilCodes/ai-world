const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  faceEntries: Number,
  foodEntries:  Number,
  colorEntries:  Number,
  apparelEntries:  Number,
  generalEntries:  Number,
  joined: Date,
});

module.exports = mongoose.model("User", userSchema);
