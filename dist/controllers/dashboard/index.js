"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../../auth/middleware"));
const constants_1 = require("../../utils/constants");
const middleware_2 = __importDefault(require("../../validations/middleware"));
const schemas_1 = require("../../validations/schemas");
const create_1 = __importDefault(require("./create"));
const delete_1 = __importDefault(require("./delete"));
const read_all_1 = __importDefault(require("./read_all"));
const read_one_1 = __importDefault(require("./read_one"));
const update_1 = __importDefault(require("./update"));
const image_upload_middleware_1 = __importDefault(require("../../validations/image_upload_middleware"));
const router = (0, express_1.Router)();
// Dashboard endpoints
router.use(middleware_1.default);
router.post("/", image_upload_middleware_1.default, (0, middleware_2.default)(schemas_1.WriteArticle), create_1.default);
router.put("/:_id", (0, middleware_2.default)(schemas_1.IdParameter, constants_1.RequestType.PARAMS), (0, middleware_2.default)(schemas_1.WriteArticle), update_1.default);
router.get("/", (0, middleware_2.default)(schemas_1.PaginationQuery, constants_1.RequestType.QUERY), read_all_1.default);
router.get("/:_id", (0, middleware_2.default)(schemas_1.IdParameter, constants_1.RequestType.PARAMS), read_one_1.default);
router.delete("/:_id", (0, middleware_2.default)(schemas_1.IdParameter, constants_1.RequestType.PARAMS), delete_1.default);
exports.default = router;
