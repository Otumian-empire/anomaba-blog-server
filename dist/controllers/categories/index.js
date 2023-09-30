"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../../auth/middleware"));
const middleware_2 = __importDefault(require("../../validations/middleware"));
const schemas_1 = require("../../validations/schemas");
const create_1 = __importDefault(require("./create"));
const delete_1 = __importDefault(require("./delete"));
const read_1 = __importDefault(require("./read"));
const router = (0, express_1.Router)();
// Dashboard endpoints
router.use(middleware_1.default);
// Public category end points
router.post("/", (0, middleware_2.default)(schemas_1.CreateCategoryValidation), create_1.default);
router.get("/", read_1.default);
router.delete("/:_id", delete_1.default);
exports.default = router;
