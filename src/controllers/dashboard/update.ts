import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import { WriteArticle } from "../../abstractions/web.interface";
import articleModel from "../../models/article.model";
import { Messages } from "../../utils/constants";
import { FailureResponse, SuccessResponse } from "../../utils/handler";

export default async function UpdateArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the user object
    // @ts-expect-error
    const user: AuthUser = req.user;

    // Get article _id from request params
    const _id = req.params._id;

    // Get the request body
    const payload: WriteArticle = req.body;

    // Insert article with user detail
    const article = await articleModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(_id),
        user: new mongoose.Types.ObjectId(user._id)
      },
      {
        content: payload.content,
        title: payload.title
      },
      {
        new: true
      }
    );

    if (!article) {
      return FailureResponse(res, Messages.ARTICLE_NOT_UPDATED);
    }

    // return success response
    return SuccessResponse(res, {
      message: Messages.ARTICLE_UPDATED_SUCCESSFULLY,
      data: {
        _id: article._id,
        title: article.title,
        content: article.content
      }
    });
  } catch (error) {
    return next(error);
  }
}
