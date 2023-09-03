import morgan from "morgan";
import morganJson from "morgan-json";
import { config, createLogger, transports } from "winston";

// TODO: for console.transport check if system is in dev mode
const loggingOptions = {
    file: {
        level: "error",
        filename: "./logs/log.log",
        handleExceptions: true,
        json: true,
        maxSize: 1024 * 1024 * 5, // 5 MB
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

const loggingFormat = morganJson({
    method: ":method",
    url: ":url",
    status: ":status",
    contentLength: ":res[content-length]",
    responseTime: ":response-time",
    remoteAddress: ":remote-addr",
    userAgent: ":user-agent"
});

export const logger = createLogger({
    levels: config.npm.levels,
    transports: [
        new transports.Console(loggingOptions.console),
        new transports.File(loggingOptions.file)
    ],
    exitOnError: false
});

export const httpLogger = morgan(loggingFormat, {
    stream: {
        write: (message) => {
            const {
                method,
                url,
                status,
                responseTime,
                remoteAddress,
                userAgent
            } = JSON.parse(message);

            logger.info("HTTP Log", {
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