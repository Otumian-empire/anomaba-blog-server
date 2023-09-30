"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("../utils/handler");
const jwt_1 = require("./jwt");
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorization = req.headers["authorization"];
            if (!authorization) {
                return (0, handler_1.AuthFailureResponse)(res);
            }
            const token = authorization.split(" ")[1];
            if (!token) {
                return (0, handler_1.AuthFailureResponse)(res);
            }
            const user = yield (0, jwt_1.verifyJwt)(token);
            // @ts-expect-error: authenticate user was expected
            req.user = user;
            return next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = AuthMiddleware;
