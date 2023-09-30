"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryValidation = exports.UpdateCommentValidation = exports.AddComment = exports.PaginationQuery = exports.IdParameter = exports.WriteArticle = exports.BasicAuth = void 0;
const joi_1 = __importDefault(require("joi"));
exports.BasicAuth = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.WriteArticle = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required()
});
exports.IdParameter = joi_1.default.object().keys({
    _id: joi_1.default.string().required()
});
exports.PaginationQuery = joi_1.default.object().keys({
    pageNumber: joi_1.default.number().positive().optional(),
    pageSize: joi_1.default.number().positive().optional()
});
exports.AddComment = joi_1.default.object().keys({
    content: joi_1.default.string().required(),
    articleId: joi_1.default.string().required()
});
exports.UpdateCommentValidation = joi_1.default.object().keys({
    content: joi_1.default.string().required()
});
exports.CreateCategoryValidation = joi_1.default.object().keys({
    name: joi_1.default.string().required()
});
