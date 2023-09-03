import mongoose from "mongoose";

import { User } from "../abstractions/model.interface";

export default mongoose.model(
  "users",
  new mongoose.Schema<User>(
    {
      username: String,
      password: String
    },
    { timestamps: true }
  )
);
