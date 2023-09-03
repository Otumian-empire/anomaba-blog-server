import { NextFunction, Request, Response } from "express";

import { AuthFailureResponse } from "../utils/handler";
import { verifyJwt } from "./jwt";

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return AuthFailureResponse(res);
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return AuthFailureResponse(res);
    }

    const user = await verifyJwt(token);

    // @ts-expect-error: authenticate user was expected
    req.user = user;

    return next();
  } catch (error) {
    next(error);
  }
}
