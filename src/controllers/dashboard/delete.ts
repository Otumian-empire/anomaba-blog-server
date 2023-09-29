import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import articleModel from "../../models/article.model";
import commentModel from "../../models/comment.model";
import { Messages } from "../../utils/constants";
import {
  AuthFailureResponse,
  FailureResponse,
  SuccessMessageResponse
} from "../../utils/handler";

export default async function DeleteArticle(
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

    // Get article _id from request params
    const articleId = req.params._id;

    // Insert article with user detail
    const article = await articleModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(articleId),
      user: new mongoose.Types.ObjectId(user._id)
    });

    if (!article) {
      return FailureResponse(res, Messages.ARTICLE_NOT_FOUND);
    }

    // Delete all articles under this article
    await commentModel.deleteMany({
      user: new mongoose.Types.ObjectId(user._id),
      article: new mongoose.Types.ObjectId(articleId)
    });

    await article.deleteOne();

    // return success response
    return SuccessMessageResponse(res, Messages.ARTICLE_DELETED_SUCCESSFULLY);
  } catch (error) {
    return next(error);
  }
}
