"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const web_interface_1 = require("../abstractions/web.interface");
exports.default = mongoose_1.default.model("articles", new mongoose_1.default.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "categories"
    },
    imageUrl: String,
    status: {
        type: String,
        default: web_interface_1.ArticleStatus.Draft
    }
}, { timestamps: true }));
