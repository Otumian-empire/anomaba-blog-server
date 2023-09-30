"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../../utils/constants");
const middleware_1 = __importDefault(require("../../validations/middleware"));
const schemas_1 = require("../../validations/schemas");
const read_all_1 = __importDefault(require("./read_all"));
const read_one_1 = __importDefault(require("./read_one"));
const router = (0, express_1.Router)();
// Public article end points
router.get("/", (0, middleware_1.default)(schemas_1.PaginationQuery, constants_1.RequestType.QUERY), read_all_1.default);
router.get("/:_id", (0, middleware_1.default)(schemas_1.IdParameter, constants_1.RequestType.PARAMS), read_one_1.default);
exports.default = router;
