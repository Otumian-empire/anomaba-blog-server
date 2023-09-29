import { NextFunction, Request, Response } from "express";

import { AuthUser } from "../../abstractions/auth.interface";
import { WriteCategory } from "../../abstractions/web.interface";
import categoryModel from "../../models/category.model";
import { Messages } from "../../utils/constants";
import {
  AuthFailureResponse,
  FailureResponse,
  SuccessMessageResponse
} from "../../utils/handler";

export default async function CreateCategory(
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
    const payload: WriteCategory = req.body;

    // Check if the category already exist
    const isExistingCategory = await Promise.resolve(
      categoryModel.findOne({
        name: payload.name
      })
    );

    if (isExistingCategory) {
      return FailureResponse(res, Messages.CATEGORY_ALREADY_EXIST);
    }

    // Create new category passing the category name
    const category = await categoryModel.create({
      name: payload.name
    });

    if (!category) {
      return FailureResponse(res, Messages.CATEGORY_NOT_CREATED);
    }

    // return success response
    return SuccessMessageResponse(res, Messages.CATEGORY_CREATED_SUCCESSFULLY);
  } catch (error) {
    return next(error);
  }
}
