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
function SignUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            // Check if username already exists
            const isExistingUser = yield Promise.resolve(user_model_1.default.findOne({ username: payload.username }));
            if (isExistingUser) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ACCOUNT_ALREADY_EXIST);
            }
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(payload.password, constants_1.Constants.SALT_ROUNDS);
            // Create user row
            const newUser = yield user_model_1.default.create({
                username: payload.username,
                password: hashedPassword
            });
            if (!newUser) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ACCOUNT_NOT_CREATED);
            }
            // Create jwt
            const token = (0, jwt_1.generateJwt)({
                _id: newUser._id
            });
            // Return success message
            return (0, handler_1.SuccessResponse)(res, {
                message: constants_1.Messages.ACCOUNT_CREATED_SUCCESSFULLY,
                data: {
                    accessToken: token,
                    user: {
                        _id: newUser._id,
                        username: newUser.username
                    }
                }
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = SignUp;
