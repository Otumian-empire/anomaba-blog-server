import Jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import mongoose from "mongoose";

import { JwtAuthPayload } from "../abstractions/auth.interface";
import userModel from "../models/user.model";
import { Messages } from "../utils/constants";
import environs from "../utils/environs";
import { logger } from "../utils/logger";

export function generateJwt(payload: JwtAuthPayload) {
  return Jwt.sign(payload, environs.JWT_SECRET, {
    expiresIn: environs.JWT_TTL,
    audience: environs.JWT_AUDIENCE,
    issuer: environs.JWT_ISSUER
  });
}

export async function verifyJwt<T extends JwtPayload>(jwtString: string) {
  try {
    // if the token has expired the an error will be thrown
    // however will also be checking if it has expired
    const { aud, exp, iss, _id } = Jwt.verify(
      jwtString,
      environs.JWT_SECRET
    ) as T;

    // convert the exp to milliseconds
    const expInMilliseconds = exp! * 1000;

    // check if the token has expired
    if (Date.now() > expInMilliseconds) {
      throw new Error(Messages.INVALID_AUTHENTICATION);
    }

    // check the issuer and audience
    if (iss! !== environs.JWT_ISSUER) {
      throw new Error(Messages.INVALID_AUTHENTICATION);
    }

    if (aud! !== environs.JWT_AUDIENCE) {
      throw new Error(Messages.INVALID_AUTHENTICATION);
    }

    const user = await Promise.resolve(
      userModel.findOne({ _id: new mongoose.Types.ObjectId(_id) })
    );

    if (!user) {
      throw new Error(Messages.INVALID_AUTHENTICATION);
    }

    return {
      _id: user._id,
      username: user.username
    };
  } catch (error) {
    logger.error(error);

    if (error instanceof TokenExpiredError) {
      throw new Error(Messages.PLEASE_LOGIN);
    }

    throw new Error(Messages.GLOBAL_ERROR);
  }
}
