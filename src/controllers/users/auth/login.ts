import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { BasicAuth } from "../../../abstractions/request.interface";
import { generateJwt } from "../../../auth/jwt";
import userModel from "../../../models/user.model";
import { Messages, StatusCode } from "../../../utils/constants";

export default async function Login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload: BasicAuth = req.body;

    // Check if username already exists
    const user = await Promise.resolve(
      userModel.findOne({ username: payload.username })
    );

    if (!user) {
      return res.status(StatusCode.OK).json({
        status: false,
        message: Messages.ACCOUNT_NOT_FOUND
      });
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(StatusCode.OK).json({
        status: false,
        message: Messages.ACCOUNT_NOT_FOUND
      });
    }

    // Create jwt
    const token = generateJwt({
      _id: user._id
    });

    // Return success message
    return res.status(StatusCode.OK).json({
      success: true,
      message: Messages.LOGGED_IN_SUCCESSFULLY,
      data: {
        accessToken: token,
        user: {
          _id: user._id,
          username: user.username
        }
      }
    });
  } catch (error) {
    return next(error);
  }
}
