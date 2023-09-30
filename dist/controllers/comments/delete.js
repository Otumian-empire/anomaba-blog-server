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
const handler_1 = require("../../utils/handler");
function DeleteComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the auth user, owner of this comment
            // @ts-expect-error: Expected authenticated user
            const user = req.user;
            if (!user) {
                return (0, handler_1.AuthFailureResponse)(res);
            }
            // Get the comment's id
            const commentId = req.params._id;
            // Read comment
            const comment = yield comment_model_1.default.findOneAndDelete({
                user: new mongoose_1.default.Types.ObjectId(user._id),
                _id: new mongoose_1.default.Types.ObjectId(commentId)
            });
            if (!comment) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.COMMENT_NOT_FOUND);
            }
            // Send success response
            return (0, handler_1.SuccessMessageResponse)(res, constants_1.Messages.COMMENT_DELETED_SUCCESSFULLY);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = DeleteComment;
