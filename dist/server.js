"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const controllers_1 = __importDefault(require("./controllers"));
const constants_1 = require("./utils/constants");
const environs_1 = __importDefault(require("./utils/environs"));
const handler_1 = require("./utils/handler");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
const port = environs_1.default.PORT;
// Middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.disable("x-powered-by");
app.use(logger_1.httpLogger);
// nginx proxy
if (environs_1.default.isProd()) {
    app.set("trust proxy", 1);
}
// Api
app.use("/api", controllers_1.default);
// Server error handle
app.use((error, _req, res, _next) => {
    logger_1.logger.error(error);
    if (environs_1.default.isDev()) {
        logger_1.logger.debug(error);
        return (0, handler_1.FailureResponse)(res, error.message);
    }
    return (0, handler_1.FailureResponse)(res, constants_1.Messages.GLOBAL_ERROR);
});
// Not Found Error handler
app.use((_req, res, _next) => {
    return (0, handler_1.FailureResponse)(res, constants_1.Messages.NOT_FOUND_ERROR);
});
// make sure that database is connected before listening to the port
mongoose_1.default
    .connect(environs_1.default.MONGOOSE_URI)
    .then(() => {
    app.listen(port, () => {
        logger_1.logger.info(`[+] Listening server on ${port}`);
    });
})
    .catch((_err) => {
    logger_1.logger.error(constants_1.Messages.DATABASE_CONNECTION_ERROR);
});
// listening on the database connection
mongoose_1.default.connection
    .once("open", () => {
    logger_1.logger.info(constants_1.Messages.DATABASE_CONNECTED);
})
    .on("error", function (_error) {
    logger_1.logger.error(constants_1.Messages.DATABASE_CONNECTION_ERROR);
});
// show database logging during development
mongoose_1.default.set("debug", environs_1.default.isDev());
