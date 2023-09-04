import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import commentModel from "../../models/comment.model";
import { Messages } from "../../utils/constants";
import { FailureResponse, SuccessMessageResponse } from "../../utils/handler";

export default async function DeleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the auth user, owner of this comment
    // @ts-expect-error: Expected authenticated user
    const user: AuthUser = req.user;

    // Get the comment's id
    const commentId = req.params._id;

    // Read comment
    const comment = await commentModel.findOneAndDelete({
      user: new mongoose.Types.ObjectId(user._id),
      _id: new mongoose.Types.ObjectId(commentId)
    });

    if (!comment) {
      return FailureResponse(res, Messages.COMMENT_NOT_FOUND);
    }

    // Send success response
    return SuccessMessageResponse(res, Messages.COMMENT_DELETED_SUCCESSFULLY);
  } catch (error) {
    return next(error);
  }
}
