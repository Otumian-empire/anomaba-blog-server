import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import articleModel from "../../models/article.model";
import { Messages } from "../../utils/constants";
import {
  AuthFailureResponse,
  FailureResponse,
  SuccessResponse
} from "../../utils/handler";

export default async function ReadOneArticle(
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

    // Get article id from request params
    const _id = req.params._id;

    // Read all articles with user id as the current user
    const article = await Promise.resolve(
      articleModel
        .findOne({
          user: new mongoose.Types.ObjectId(user._id),
          _id: new mongoose.Types.ObjectId(_id)
        })
        .populate({
          path: "user",
          select: ["username", "_id"]
        })
        .populate({
          path: "category",
          select: ["name", "_id"]
        })
        .select("-__v")
        .exec()
    );

    if (!article) {
      return FailureResponse(res, Messages.ARTICLE_NOT_FOUND);
    }

    // return success response
    return SuccessResponse(res, {
      message: Messages.ARTICLE_READ_SUCCESSFULLY,
      data: article
    });
  } catch (error) {
    return next(error);
  }
}
