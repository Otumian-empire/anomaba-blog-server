"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = mongoose_1.default.model("articles", new mongoose_1.default.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true }));
