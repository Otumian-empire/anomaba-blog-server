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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../../auth/jwt");
const user_model_1 = __importDefault(require("../../../models/user.model"));
const constants_1 = require("../../../utils/constants");
const handler_1 = require("../../../utils/handler");
function Login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            // Check if username already exists
            const user = yield Promise.resolve(user_model_1.default.findOne({ username: payload.username }));
            if (!user) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ACCOUNT_NOT_FOUND);
            }
            // Verify the password
            const isValidPassword = yield bcrypt_1.default.compare(payload.password, user.password);
            if (!isValidPassword) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ACCOUNT_NOT_FOUND);
            }
            // Create jwt
            const token = (0, jwt_1.generateJwt)({
                _id: user._id
            });
            // Return success message
            return (0, handler_1.SuccessResponse)(res, {
                message: constants_1.Messages.LOGGED_IN_SUCCESSFULLY,
                data: {
                    accessToken: token,
                    user: {
                        _id: user._id,
                        username: user.username
                    }
                }
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = Login;
