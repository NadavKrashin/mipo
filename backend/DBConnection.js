import { connect } from "mongoose";

const mongoURI = process.env.MONGO_URI;
connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
