"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyJwt = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const constants_1 = require("../utils/constants");
const environs_1 = __importDefault(require("../utils/environs"));
const logger_1 = require("../utils/logger");
function generateJwt(payload) {
    return jsonwebtoken_1.default.sign(payload, environs_1.default.JWT_SECRET, {
        expiresIn: environs_1.default.JWT_TTL,
        audience: environs_1.default.JWT_AUDIENCE,
        issuer: environs_1.default.JWT_ISSUER
    });
}
exports.generateJwt = generateJwt;
function verifyJwt(jwtString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // if the token has expired the an error will be thrown
            // however will also be checking if it has expired
            const { aud, exp, iss, _id } = jsonwebtoken_1.default.verify(jwtString, environs_1.default.JWT_SECRET);
            // convert the exp to milliseconds
            const expInMilliseconds = exp * 1000;
            // check if the token has expired
            if (Date.now() > expInMilliseconds) {
                throw new Error(constants_1.Messages.INVALID_AUTHENTICATION);
            }
            // check the issuer and audience
            if (iss !== environs_1.default.JWT_ISSUER) {
                throw new Error(constants_1.Messages.INVALID_AUTHENTICATION);
            }
            if (aud !== environs_1.default.JWT_AUDIENCE) {
                throw new Error(constants_1.Messages.INVALID_AUTHENTICATION);
            }
            const user = yield Promise.resolve(user_model_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(_id) }));
            if (!user) {
                throw new Error(constants_1.Messages.INVALID_AUTHENTICATION);
            }
            return {
                _id: user._id,
                username: user.username
            };
        }
        catch (error) {
            logger_1.logger.error(error);
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new Error(constants_1.Messages.PLEASE_LOGIN);
            }
            throw new Error(constants_1.Messages.GLOBAL_ERROR);
        }
    });
}
exports.verifyJwt = verifyJwt;
