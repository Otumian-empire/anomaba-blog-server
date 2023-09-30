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
const comment_model_1 = __importDefault(require("../../models/comment.model"));
const constants_1 = require("../../utils/constants");
const handler_1 = require("../../utils/handler");
function CreateComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get auth user
            // @ts-expect-error: Authentication required
            const user = req.user;
            if (!user) {
                return (0, handler_1.AuthFailureResponse)(res);
            }
            // Get comment and article id
            const content = req.body.content;
            const articleId = req.body.articleId;
            // Check if the said article exists
            const isExistingArticle = yield article_model_1.default.findOne({
                _id: new mongoose_1.default.Types.ObjectId(articleId)
            });
            if (!isExistingArticle) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ARTICLE_NOT_FOUND);
            }
            // Create comment
            const comment = yield comment_model_1.default.create({
                article: new mongoose_1.default.Types.ObjectId(articleId),
                user: new mongoose_1.default.Types.ObjectId(user._id),
                content: content
            });
            if (!comment) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.COMMENT_NOT_CREATED);
            }
            // Send success response
            return (0, handler_1.SuccessResponse)(res, {
                message: constants_1.Messages.COMMENT_CREATED_SUCCESSFULLY,
                data: {
                    _id: comment._id,
                    article: comment.article,
                    user: comment.user,
                    content: comment.content
                }
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = CreateComment;
