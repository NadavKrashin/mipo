const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  team: String,
  phone: String,
  avatar: String,
  present: Boolean,
  isHome: Boolean,
  isMamash: Boolean,
  isAdmin: Boolean,
  absentReason: String,
});

module.exports.User = mongoose.model("User", userSchema);
