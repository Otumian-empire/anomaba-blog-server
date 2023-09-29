import { NextFunction, Request, Response } from "express";

import { AuthUser } from "../../abstractions/auth.interface";
import categoryModel from "../../models/category.model";
import { Messages } from "../../utils/constants";
import {
  getPaginationParams,
  setPaginationParams
} from "../../utils/functions";
import { AuthFailureResponse, SuccessResponse } from "../../utils/handler";

export default async function ReadAllCategories(
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

    // Get pagination parameters request query
    const { pageNumber, pageSize } = setPaginationParams(
      req.query.pageNumber?.toString(),
      req.query.pageSize?.toString()
    );

    // Read all articles with user id as the current user
    const [categories, count] = await Promise.all([
      categoryModel
        .find()
        .sort({ createdAt: -1 })
        .select("-__v")
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      categoryModel.find().count()
    ]);

    // return success response
    return SuccessResponse(res, {
      message: Messages.CATEGORIES_READ_SUCCESSFULLY,
      data: {
        rows: categories,
        pagination: getPaginationParams(count, pageNumber, pageSize)
      }
    });
  } catch (error) {
    return next(error);
  }
}
