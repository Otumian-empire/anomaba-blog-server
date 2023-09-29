import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { AuthUser } from "../../abstractions/auth.interface";
import categoryModel from "../../models/category.model";
import { Messages } from "../../utils/constants";
import {
  AuthFailureResponse,
  FailureResponse,
  SuccessMessageResponse
} from "../../utils/handler";

export default async function DeleteCategory(
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

    // Get category _id from request params
    const categoryId = req.params._id;

    // Insert category with user detail
    const category = await categoryModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(categoryId)
    });

    if (!category) {
      return FailureResponse(res, Messages.CATEGORY_NOT_FOUND);
    }

    // return success response
    return SuccessMessageResponse(res, Messages.CATEGORY_DELETED_SUCCESSFULLY);
  } catch (error) {
    return next(error);
  }
}
