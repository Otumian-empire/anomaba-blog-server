"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articles_1 = __importDefault(require("./articles"));
const comments_1 = __importDefault(require("./comments"));
const dashboard_1 = __importDefault(require("./dashboard"));
const users_1 = __importDefault(require("./users"));
const categories_1 = __importDefault(require("./categories"));
const router = (0, express_1.Router)();
// User
router.use("/users", users_1.default);
// Dashboard
router.use("/dashboard", dashboard_1.default);
// Articles
router.use("/articles", articles_1.default);
// Comments
router.use("/comments", comments_1.default);
// Category
router.use("/categories", categories_1.default);
exports.default = router;
