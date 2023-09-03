import { Response } from "express";

import { ResponseBody } from "../abstractions/web.interface";
import { StatusCode } from "./constants";

export function FailureResponse(res: Response, message: string) {
  return res.status(StatusCode.OK).json({
    status: false,
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
