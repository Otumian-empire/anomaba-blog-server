import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import articleModel from "../../models/article.model";
import commentModel from "../../models/comment.model";
import { Messages } from "../../utils/constants";
import { FailureResponse, SuccessResponse } from "../../utils/handler";

export default async function CreateComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get auth user
    // @ts-expect-error: Authentication required
    const user: AuthUser = req.user;

    // Get comment and article id
    const content = req.body.content;
    const articleId = req.body.articleId;

    // Check if the said article exists
    const isExistingArticle = await articleModel.findOne({
      _id: new mongoose.Types.ObjectId(articleId)
    });

    if (!isExistingArticle) {
      return FailureResponse(res, Messages.ARTICLE_NOT_FOUND);
    }

    // Create comment
    const comment = await commentModel.create({
      article: new mongoose.Types.ObjectId(articleId),
      user: new mongoose.Types.ObjectId(user._id),
      content: content
    });

    if (!comment) {
      return FailureResponse(res, Messages.COMMENT_NOT_CREATED);
    }

    // Send success response
    return SuccessResponse(res, {
      message: Messages.COMMENT_CREATED_SUCCESSFULLY,
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
