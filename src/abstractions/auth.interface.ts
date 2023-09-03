import mongoose from "mongoose";

export type JwtAuthPayload = {
  _id: mongoose.Types.ObjectId;
};

export type AuthUser = JwtAuthPayload & { username: string };
