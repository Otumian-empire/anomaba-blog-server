import { Router } from "express";

import { RequestType } from "../../utils/constants";
import ValidationMiddleware from "../../validations/middleware";
import { IdParameter, PaginationQuery } from "../../validations/schemas";
import ReadAllArticles from "./read_all";
import ReadOneArticle from "./read_one";

const router = Router();

// Public article end points
router.get(
  "/",
  ValidationMiddleware(PaginationQuery, RequestType.QUERY),
  ReadAllArticles
);

router.get(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ReadOneArticle
);

export default router;
