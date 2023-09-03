import mongoose from "mongoose";

import { Comment } from "../abstractions/model.interface";

export default mongoose.model(
  "comments",
  new mongoose.Schema<Comment>(
    {
      content: String,
      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles"
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    },
    { timestamps: true }
  )
);
