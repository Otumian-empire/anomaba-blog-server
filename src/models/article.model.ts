import mongoose from "mongoose";

import { Article } from "../abstractions/model.interface";
import { ArticleStatus } from "../abstractions/web.interface";

export default mongoose.model(
  "articles",
  new mongoose.Schema<Article>(
    {
      title: String,
      content: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
      },
      imageUrl: String,
      status: {
        type: String,
        default: ArticleStatus.Draft
      }
    },
    { timestamps: true }
  )
);
