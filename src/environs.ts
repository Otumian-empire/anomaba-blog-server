import "dotenv/config";

import { Constants } from "./constants";

export default {
  PORT: Number(process.env.PORT) ?? Constants.PORT,
  NODE_ENV: process.env.NODE_ENV ?? Constants.DEVELOPMENT,
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_TTL: process.env.JWT_TTL ?? Constants.JWT_TTL,
  SALT_ROUNDS: process.env.SALT_ROUNDS ?? Constants.SALT_ROUNDS,
  MONGOOSE_URI: process.env.MONGOOSE_URI ?? "",
  isDev: () => process.env.NODE_ENV === Constants.DEVELOPMENT,
  isProd: () => process.env.NODE_ENV === Constants.PRODUCTION
};
