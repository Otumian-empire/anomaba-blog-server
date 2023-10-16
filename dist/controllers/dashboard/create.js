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
function CreateArticle(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the user object
            // @ts-expect-error: Authentication required
            const user = req.user;
            if (!user) {
                return (0, handler_1.AuthFailureResponse)(res);
            }
            // Get the request body
            const payload = req.body;
            // Insert article with user detail
            const article = yield article_model_1.default.create({
                content: payload.content,
                title: payload.title,
                imageUrl: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
                category: new mongoose_1.default.Types.ObjectId(payload.category),
                user: new mongoose_1.default.Types.ObjectId(user._id)
            });
            if (!article) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.ARTICLE_NOT_CREATED);
            }
            // return success response
            return (0, handler_1.SuccessMessageResponse)(res, constants_1.Messages.ARTICLE_CREATED_SUCCESSFULLY);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = CreateArticle;
