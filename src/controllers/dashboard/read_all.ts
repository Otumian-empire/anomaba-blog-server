import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import articleModel from "../../models/article.model";
import { Messages } from "../../utils/constants";
import {
  getPaginationParams,
  setPaginationParams
} from "../../utils/functions";
import { SuccessResponse } from "../../utils/handler";

export default async function ReadAllArticles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the user object
    // @ts-expect-error: Authentication required
    const user: AuthUser = req.user;

    // Get pagination parameters request query
    const { pageNumber, pageSize } = setPaginationParams(
      req.query.pageNumber?.toString(),
      req.query.pageSize?.toString()
    );

    // Read all articles with user id as the current user
    const [articles, count] = await Promise.all([
      articleModel
        .find({
          user: new mongoose.Types.ObjectId(user._id)
        })
        .select("-__v")
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      articleModel
        .find({
          user: new mongoose.Types.ObjectId(user._id)
        })
        .count()
    ]);

    // return success response
    return SuccessResponse(res, {
      message: Messages.ARTICLES_READ_SUCCESSFULLY,
      data: {
        rows: articles,
        pagination: getPaginationParams(count, pageNumber, pageSize)
      }
    });
  } catch (error) {
    return next(error);
  }
}
