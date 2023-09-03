import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { BasicAuth } from "../../../abstractions/web.interface";
import { generateJwt } from "../../../auth/jwt";
import userModel from "../../../models/user.model";
import { Constants, Messages } from "../../../utils/constants";
import { FailureResponse, SuccessResponse } from "../../../utils/handler";

export default async function SignUp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload: BasicAuth = req.body;

    // Check if username already exists
    const isExistingUser = await Promise.resolve(
      userModel.findOne({ username: payload.username })
    );

    if (isExistingUser) {
      return FailureResponse(res, Messages.ACCOUNT_ALREADY_EXIST);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Constants.SALT_ROUNDS
    );

    // Create user row
    const newUser = await userModel.create({
      username: payload.username,
      password: hashedPassword
    });

    if (!newUser) {
      return FailureResponse(res, Messages.ACCOUNT_NOT_CREATED);
    }

    // Create jwt
    const token = generateJwt({
      _id: newUser._id
    });

    // Return success message
    return SuccessResponse(res, {
      message: Messages.ACCOUNT_CREATED_SUCCESSFULLY,
      data: {
        accessToken: token,
        user: {
          _id: newUser._id,
          username: newUser.username
        }
      }
    });
  } catch (error) {
    return next(error);
  }
}
