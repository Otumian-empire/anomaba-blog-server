import { NextFunction, Request, Response } from "express";

import { RequestType, StatusCode } from "../utils/constants";

export default (schema: any, property: string = RequestType.BODY) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: true, // include all errors
      allowUnknown: true, // ignore unknown props
      convert: true
    };

    // @ts-ignore
    const { error } = schema.validate(req[property], options);
    const valid = error == null;

    if (valid) {
      return next();
    } else {
      const messages = error.details.map((err: any) => err.message).join(",");
      return res.status(StatusCode.OK).json({
        success: false,
        message: messages
      });
    }
  };
};
