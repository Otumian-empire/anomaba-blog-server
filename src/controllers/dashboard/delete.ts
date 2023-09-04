import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import articleModel from "../../models/article.model";
import { Messages } from "../../utils/constants";
import { FailureResponse, SuccessMessageResponse } from "../../utils/handler";

export default async function DeleteArticle(
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

    // Insert article with user detail
    const article = await articleModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(_id),
      user: new mongoose.Types.ObjectId(user._id)
    });

    if (!article) {
      return FailureResponse(res, Messages.ARTICLE_NOT_FOUND);
    }

    // return success response
    return SuccessMessageResponse(res, Messages.ARTICLE_DELETED_SUCCESSFULLY);
  } catch (error) {
    return next(error);
  }
}
