import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Api from "./controllers";
import { Messages } from "./utils/constants";
import Environs from "./utils/environs";
import { FailureResponse } from "./utils/handler";
import { httpLogger, logger } from "./utils/logger";

const app = express();
const port = Environs.PORT;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
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
  logger.error(error);

  if (Environs.isDev()) {
    logger.debug(error);
    return FailureResponse(res, error.message);
  }

  return FailureResponse(res, Messages.GLOBAL_ERROR);
});

// Not Found Error handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  return FailureResponse(res, Messages.NOT_FOUND_ERROR);
});

// make sure that database is connected before listening to the port
mongoose
  .connect(Environs.MONGOOSE_URI)
  .then(() => {
    app.listen(port, () => {
      logger.info(`[+] Listening server on ${port}`);
    });
  })
  .catch((_err) => {
    logger.error(Messages.DATABASE_CONNECTION_ERROR);
  });

// listening on the database connection
mongoose.connection
  .once("open", () => {
    logger.info(Messages.DATABASE_CONNECTED);
  })
  .on("error", function (_error) {
    logger.error(Messages.DATABASE_CONNECTION_ERROR);
  });

// show database logging during development
mongoose.set("debug", Environs.isDev());
