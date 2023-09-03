import "dotenv/config";

import { Constants } from "./constants";

export default {
  PORT: Number(process.env.PORT) ?? Constants.PORT,
  NODE_ENV: process.env.NODE_ENV ?? Constants.DEVELOPMENT,
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_TTL: Number(process.env.JWT_TTL) ?? Constants.JWT_TTL,
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  SALT_ROUNDS: process.env.SALT_ROUNDS ?? Constants.SALT_ROUNDS,
  MONGOOSE_URI: process.env.MONGOOSE_URI ?? "",
  isDev: () => process.env.NODE_ENV === Constants.DEVELOPMENT,
  isProd: () => process.env.NODE_ENV === Constants.PRODUCTION
};
