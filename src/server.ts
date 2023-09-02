import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { Messages, StatusCode } from "./utils/constants";
import Api from "./controllers";
import Environs from "./utils/environs";

const app = express();
const port = Environs.PORT;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(cors({ credentials: true, origin: "*" }));
app.disable("x-powered-by");

// nginx proxy
if (Environs.isProd()) {
  app.set("trust proxy", 1);
}

// Api
app.use("/api", Api);

// Server error handle
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (Environs.isDev()) {
    return res.status(StatusCode.INTERNAL_ERROR).json({
      success: false,
      message: error.message
    });
  }

  return res.status(StatusCode.OK).json({
    success: false,
    message: Messages.GLOBAL_ERROR
  });
});

// Not Found Error handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  return res.status(StatusCode.NOT_FOUND_ERROR).json({
    success: false,
    message: Messages.NOT_FOUND_ERROR
  });
});

// make sure that database is connected before listening to the port
mongoose
  .connect(Environs.MONGOOSE_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`[+] Listening server on ${port}`);
    });
  })
  .catch((_err) => {
    console.log(Messages.DATABASE_CONNECTION_ERROR);
  });

// listening on the database connection
mongoose.connection
  .once("open", () => {
    console.log(Messages.DATABASE_CONNECTED);
  })
  .on("error", function (_error) {
    console.log(Messages.DATABASE_CONNECTION_ERROR);
  });

// show database logging during development
mongoose.set("debug", Environs.isDev());
