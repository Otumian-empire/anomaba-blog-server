import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import commentModel from "../../models/comment.model";
import { Messages } from "../../utils/constants";
import {
  AuthFailureResponse,
  FailureResponse,
  SuccessResponse
} from "../../utils/handler";

export default async function UpdateComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the auth user, owner of this comment
    // @ts-expect-error: Expected authenticated user
    const user: AuthUser = req.user;

    if (!user) {
      return AuthFailureResponse(res);
    }

    // Get the comment's id
    const commentId = req.params._id;

    const content = req.body.content;

    // Read comment
    const comment = await commentModel.findOneAndUpdate(
      {
        user: new mongoose.Types.ObjectId(user._id),
        _id: new mongoose.Types.ObjectId(commentId)
      },
      {
        content: content
      },
      {
        new: true
      }
    );

    if (!comment) {
      return FailureResponse(res, Messages.COMMENT_NOT_FOUND);
    }

    // Send success response
    return SuccessResponse(res, {
      message: Messages.COMMENT_UPDATED_SUCCESSFULLY,
      data: {
        _id: comment._id,
        article: comment.article,
        user: comment.user,
        content: comment.content
      }
    });
  } catch (error) {
    return next(error);
  }
}
