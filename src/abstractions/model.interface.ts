import mongoose from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
};

export type Article = {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  user: mongoose.Types.ObjectId;
};

export type Comment = {
  _id: mongoose.Types.ObjectId;
  content: string;
  user: mongoose.Types.ObjectId;
  article: mongoose.Types.ObjectId;
};
