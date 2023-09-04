import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import { RequestType } from "../../utils/constants";
import ValidationMiddleware from "../../validations/middleware";
import { IdParameter, WriteArticle } from "../../validations/schemas";
import CreateArticle from "./create";
import UpdateArticle from "./update";

const router = Router();

// Article end points
router.post(
  "/",
  AuthMiddleware,
  ValidationMiddleware(WriteArticle),
  CreateArticle
);

router.put(
  "/:_id",
  AuthMiddleware,
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ValidationMiddleware(WriteArticle),
  UpdateArticle
);

export default router;
