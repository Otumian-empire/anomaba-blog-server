import { Response } from "express";

import { ResponseBody } from "../abstractions/web.interface";
import { Messages, StatusCode } from "./constants";

export function FailureResponse(res: Response, message: string) {
  return res.status(StatusCode.OK).json({
    status: false,
    message: message
  });
}

export function AuthFailureResponse(res: Response) {
  return res.status(StatusCode.UNAUTHORIZED).json({
    status: false,
    message: Messages.UNAUTHORIZED
  });
}

export function ForbiddenResponse(res: Response) {
  return res.status(StatusCode.FORBIDDEN).json({
    status: false,
    message: Messages.FORBIDDEN
  });
}

export function SuccessMessageResponse(res: Response, message: string) {
  return res.status(StatusCode.OK).json({
    success: true,
    message: message
  });
}

export function SuccessResponse(res: Response, body: ResponseBody) {
  return res.status(StatusCode.OK).json({
    success: true,
    message: body.message,
    data: body.data
  });
}
