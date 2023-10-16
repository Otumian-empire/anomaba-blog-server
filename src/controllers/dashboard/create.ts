import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import { WriteArticle } from "../../abstractions/web.interface";
import articleModel from "../../models/article.model";
import { Messages } from "../../utils/constants";
import {
  AuthFailureResponse,
  FailureResponse,
  SuccessMessageResponse
} from "../../utils/handler";

export default async function CreateArticle(
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

    // Get the request body
    const payload: WriteArticle = req.body;    

    // Insert article with user detail
    const article = await articleModel.create({
      content: payload.content,
      title: payload.title,
      imageUrl: req.file?.filename,
      category: new mongoose.Types.ObjectId(payload.category),
      user: new mongoose.Types.ObjectId(user._id)
    });

    if (!article) {
      return FailureResponse(res, Messages.ARTICLE_NOT_CREATED);
    }

    // return success response
    return SuccessMessageResponse(res, Messages.ARTICLE_CREATED_SUCCESSFULLY);
  } catch (error) {
    return next(error);
  }
}
