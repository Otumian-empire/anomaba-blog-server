import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import { RequestType } from "../../utils/constants";
import ValidationMiddleware from "../../validations/middleware";
import {
  IdParameter,
  PaginationQuery,
  WriteArticle
} from "../../validations/schemas";
import CreateArticle from "./create";
import ReadAllArticles from "./read_all";
import UpdateArticle from "./update";

const router = Router();

router.use(AuthMiddleware);

// Article end points
router.post(
  "/",

  ValidationMiddleware(WriteArticle),
  CreateArticle
);

router.put(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ValidationMiddleware(WriteArticle),
  UpdateArticle
);

router.get(
  "/",
  ValidationMiddleware(PaginationQuery, RequestType.QUERY),
  ReadAllArticles
);

export default router;
