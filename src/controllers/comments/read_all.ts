import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import commentModel from "../../models/comment.model";
import { Messages } from "../../utils/constants";
import {
  getPaginationParams,
  setPaginationParams
} from "../../utils/functions";
import { AuthFailureResponse, SuccessResponse } from "../../utils/handler";

export default async function ReadAllComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the user object
    // @ts-expect-error: Authentication required
    const user: AuthUser = req.user;

    if (!user) {
      return AuthFailureResponse(res);
    }

    // Get the article's id
    const articleId = req.params._id;

    // Get pagination parameters request query
    const { pageNumber, pageSize } = setPaginationParams(
      req.query.pageNumber?.toString(),
      req.query.pageSize?.toString()
    );

    // Read all articles with user id as the current user
    const [comments, count] = await Promise.all([
      commentModel
        .find({
          article: new mongoose.Types.ObjectId(articleId)
        })
        .sort({ createdAt: -1 })
        .select("-__v")
        .populate({
          path: "user",
          select: ["username"]
        })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      commentModel
        .find({
          article: new mongoose.Types.ObjectId(articleId)
        })
        .count()
    ]);

    // return success response
    return SuccessResponse(res, {
      message: Messages.COMMENTS_READ_SUCCESSFULLY,
      data: {
        rows: comments,
        pagination: getPaginationParams(count, pageNumber, pageSize)
      }
    });
  } catch (error) {
    return next(error);
  }
}
