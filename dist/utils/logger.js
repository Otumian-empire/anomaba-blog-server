"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.logger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const morgan_json_1 = __importDefault(require("morgan-json"));
const winston_1 = require("winston");
// TODO: for console.transport check if system is in dev mode
const loggingOptions = {
    file: {
        level: "error",
        filename: "./logs/log.log",
        handleExceptions: true,
        json: true,
        maxSize: 1024 * 1024 * 5,
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true
    }
};
const loggingFormat = (0, morgan_json_1.default)({
    method: ":method",
    url: ":url",
    status: ":status",
    contentLength: ":res[content-length]",
    responseTime: ":response-time",
    remoteAddress: ":remote-addr",
    userAgent: ":user-agent"
});
exports.logger = (0, winston_1.createLogger)({
    levels: winston_1.config.npm.levels,
    transports: [
        new winston_1.transports.Console(loggingOptions.console),
        new winston_1.transports.File(loggingOptions.file)
    ],
    exitOnError: false
});
exports.httpLogger = (0, morgan_1.default)(loggingFormat, {
    stream: {
        write: (message) => {
            const { method, url, status, responseTime, remoteAddress, userAgent } = JSON.parse(message);
            exports.logger.info("HTTP Log", {
                timestamp: new Date().toISOString(),
                method,
                url,
                status: Number(status),
                responseTime: Number(responseTime),
                remoteAddress,
                userAgent
            });
        }
    }
});
