import path from "path";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import mongoose from "mongoose";

import Api from "./controllers";
import { Messages } from "./utils/constants";
import Environs from "./utils/environs";
import {
  FailureResponse,
  JwtErrorResponse,
  NotFoundResponse
} from "./utils/handler";
import { httpLogger, logger } from "./utils/logger";

const app = express();
const port = Environs.PORT;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.disable("x-powered-by");
app.use(httpLogger);

// nginx proxy
if (Environs.isProd()) {
  app.set("trust proxy", 1);
}

// Api
app.use("/api", Api);

// Server error handle
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.debug(error);
  logger.error(error);

  if (Environs.isDev()) {
    return FailureResponse(res, error.message);
  }

  if (error instanceof TokenExpiredError) {
    return JwtErrorResponse(res, error.message);
  }

  if (error instanceof JsonWebTokenError) {
    return JwtErrorResponse(res, Messages.INVALID_TOKEN);
  }

  return FailureResponse(res, Messages.GLOBAL_ERROR);
});

// Not Found Error handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  return NotFoundResponse(res);
});

// make sure that database is connected before listening to the port
// set the `strictQuery` option  to true
mongoose.set("strictQuery", true);

// show database logging during development
mongoose.set("debug", Environs.isDev());

mongoose
  .connect(Environs.MONGOOSE_URI)
  .then(() => {
    app.listen(port, () => {
      logger.info(`[+] Listening server on ${port}`);
    });
  })
  .catch((err) => {
    logger.debug(Messages.DATABASE_CONNECTION_ERROR);
    logger.debug(err);
    logger.error(err);
  });

// listening on the database connection
mongoose.connection
  .once("open", () => {
    logger.info(Messages.DATABASE_CONNECTED);
  })
  .on("error", (error) => {
    logger.debug(Messages.DATABASE_CONNECTION_ERROR);
    logger.debug(error);
    logger.error(error);
  });
