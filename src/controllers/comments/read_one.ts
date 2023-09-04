import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import commentModel from "../../models/comment.model";
import { Messages } from "../../utils/constants";
import { FailureResponse, SuccessResponse } from "../../utils/handler";

export default async function ReadOneComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the comment's id
    const commentId = req.params._id;

    // Read comment
    const comment = await commentModel
      .findOne({
        _id: new mongoose.Types.ObjectId(commentId)
      })
      .populate({
        path: "user",
        select: ["username"]
      });

    if (!comment) {
      return FailureResponse(res, Messages.COMMENT_NOT_FOUND);
    }

    // Send success response
    return SuccessResponse(res, {
      message: Messages.COMMENT_READ_SUCCESSFULLY,
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
