import { Schema, model } from "mongoose";

const userSchema = new Schema({
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

export const User = model("User", userSchema);
