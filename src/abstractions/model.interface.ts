import mongoose from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
};
