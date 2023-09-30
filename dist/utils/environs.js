"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const constants_1 = require("./constants");
exports.default = {
    PORT: (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : constants_1.Constants.PORT,
    NODE_ENV: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : constants_1.Constants.DEVELOPMENT,
    JWT_SECRET: (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "",
    JWT_TTL: (_d = Number(process.env.JWT_TTL)) !== null && _d !== void 0 ? _d : constants_1.Constants.JWT_TTL,
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_AUDIENCE: process.env.JWT_AUDIENCE,
    SALT_ROUNDS: (_e = process.env.SALT_ROUNDS) !== null && _e !== void 0 ? _e : constants_1.Constants.SALT_ROUNDS,
    MONGOOSE_URI: (_f = process.env.MONGOOSE_URI) !== null && _f !== void 0 ? _f : "",
    isDev: () => process.env.NODE_ENV === constants_1.Constants.DEVELOPMENT,
    isProd: () => process.env.NODE_ENV === constants_1.Constants.PRODUCTION
};
