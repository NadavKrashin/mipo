const xlsx = require("xlsx");
require("dotenv").config();
const mongoose = require("mongoose");

const workbook = xlsx.readFile("./mipo_template.xlsx");
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json(worksheet);

const users = jsonData.map((entry) => {
  const name = entry.Name || entry.name || "";

  return {
    name,
    team: `${entry.Team || entry.team || ""} צוות`,
    phone: entry.Phone || entry.phone || "",
    avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=${name}`,
    present: false,
    isHome: false,
    isMamash: false,
    isAdmin: name === "סגל" ? true : false,
    absentReason: "",
  };
});

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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

const User = mongoose.model("User", userSchema);

User.deleteMany({}).then(() => {
  User.insertMany(users)
    .then(() => {
      console.log("Users added");
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});
