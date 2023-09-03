import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { BasicAuth } from "../../../abstractions/request.interface";
import { generateJwt } from "../../../auth/jwt";
import userModel from "../../../models/user.model";
import { Constants, Messages, StatusCode } from "../../../utils/constants";

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
      return res.status(StatusCode.OK).json({
        status: false,
        message: Messages.ACCOUNT_ALREADY_EXIST
      });
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
      return res.status(StatusCode.OK).json({
        status: false,
        message: Messages.ACCOUNT_NOT_CREATED
      });
    }

    // Create jwt
    const token = generateJwt({
      _id: newUser._id
    });

    // Return success message
    return res.status(StatusCode.OK).json({
      success: true,
      message: Messages.ACCOUNT_CREATED_SUCCESSFULLY,
      data: {
        accessToken: token
      }
    });
  } catch (error) {
    return next(error);
  }
}
