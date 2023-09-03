import Jwt from "jsonwebtoken";

import { JwtAuthPayload } from "../abstractions/auth.interface";
import environs from "../utils/environs";

export function generateJwt(payload: JwtAuthPayload) {
  return Jwt.sign(payload, environs.JWT_SECRET, {
    expiresIn: environs.JWT_TTL,
    audience: environs.JWT_AUDIENCE,
    issuer: environs.JWT_ISSUER
  });
}
