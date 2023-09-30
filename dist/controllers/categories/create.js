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
const category_model_1 = __importDefault(require("../../models/category.model"));
const constants_1 = require("../../utils/constants");
const handler_1 = require("../../utils/handler");
function CreateCategory(req, res, next) {
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
            // Check if the category already exist
            const isExistingCategory = yield Promise.resolve(category_model_1.default.findOne({
                name: payload.name
            }));
            if (isExistingCategory) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.CATEGORY_ALREADY_EXIST);
            }
            // Create new category passing the category name
            const category = yield category_model_1.default.create({
                name: payload.name
            });
            if (!category) {
                return (0, handler_1.FailureResponse)(res, constants_1.Messages.CATEGORY_NOT_CREATED);
            }
            // return success response
            return (0, handler_1.SuccessMessageResponse)(res, constants_1.Messages.CATEGORY_CREATED_SUCCESSFULLY);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = CreateCategory;
