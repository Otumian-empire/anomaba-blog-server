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
const mongoose_1 = __importDefault(require("mongoose"));
const article_model_1 = __importDefault(require("../../models/article.model"));
const constants_1 = require("../../utils/constants");
const handler_1 = require("../../utils/handler");
function ReadOneArticle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get article id from request params
            const _id = req.params._id;
            // Read all articles with user id as the current user
            const article = yield Promise.resolve(article_model_1.default
                .findOne({
                _id: new mongoose_1.default.Types.ObjectId(_id)
            })
                .populate({
                path: "user",
                select: ["username"]
            })
                .populate({
                path: "category",
                select: ["name"]
            })
                .select("-__v")
                .exec());
            if (!article) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ARTICLE_NOT_FOUND);
            }
            // return success response
            return (0, handler_1.SuccessResponse)(res, {
                message: constants_1.Messages.ARTICLE_READ_SUCCESSFULLY,
                data: article
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = ReadOneArticle;
