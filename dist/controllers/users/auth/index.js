"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../../../validations/middleware"));
const schemas_1 = require("../../../validations/schemas");
const login_1 = __importDefault(require("./login"));
const signup_1 = __importDefault(require("./signup"));
const router = (0, express_1.Router)();
// User end points
router.post("/signup", (0, middleware_1.default)(schemas_1.BasicAuth), signup_1.default);
router.post("/login", (0, middleware_1.default)(schemas_1.BasicAuth), login_1.default);
exports.default = router;
