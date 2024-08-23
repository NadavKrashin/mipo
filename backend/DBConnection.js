const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://NadavKrashin:47GH56gsugcRzYrD@mipo.ut2suld.mongodb.net/pluga_b_brosh?retryWrites=true&w=majority&appName=MiPo";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
