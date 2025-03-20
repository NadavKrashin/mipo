import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const mongoURI = process.env.MONGO_URI;
connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
