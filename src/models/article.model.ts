import mongoose from "mongoose";

import { Article } from "../abstractions/model.interface";

export default mongoose.model(
  "articles",
  new mongoose.Schema<Article>(
    {
      title: String,
      content: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    },
    { timestamps: true }
  )
);
