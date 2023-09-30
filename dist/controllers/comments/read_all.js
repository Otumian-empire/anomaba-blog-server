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
const comment_model_1 = __importDefault(require("../../models/comment.model"));
const constants_1 = require("../../utils/constants");
const functions_1 = require("../../utils/functions");
const handler_1 = require("../../utils/handler");
function ReadAllComments(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the user object
            // @ts-expect-error: Authentication required
            const user = req.user;
            if (!user) {
                return (0, handler_1.AuthFailureResponse)(res);
            }
            // Get the article's id
            const articleId = req.params._id;
            // Get pagination parameters request query
            const { pageNumber, pageSize } = (0, functions_1.setPaginationParams)((_a = req.query.pageNumber) === null || _a === void 0 ? void 0 : _a.toString(), (_b = req.query.pageSize) === null || _b === void 0 ? void 0 : _b.toString());
            // Read all articles with user id as the current user
            const [comments, count] = yield Promise.all([
                comment_model_1.default
                    .find({
                    article: new mongoose_1.default.Types.ObjectId(articleId)
                })
                    .sort({ createdAt: -1 })
                    .select("-__v")
                    .populate({
                    path: "user",
                    select: ["username"]
                })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .exec(),
                comment_model_1.default
                    .find({
                    article: new mongoose_1.default.Types.ObjectId(articleId)
                })
                    .count()
            ]);
            // return success response
            return (0, handler_1.SuccessResponse)(res, {
                message: constants_1.Messages.COMMENTS_READ_SUCCESSFULLY,
                data: {
                    rows: comments,
                    pagination: (0, functions_1.getPaginationParams)(count, pageNumber, pageSize)
                }
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = ReadAllComments;
