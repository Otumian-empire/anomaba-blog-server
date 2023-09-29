import mongoose from "mongoose";

import { Category } from "../abstractions/model.interface";

export default mongoose.model(
  "categories",
  new mongoose.Schema<Category>(
    {
      name: String
    },
    { timestamps: true }
  )
);
