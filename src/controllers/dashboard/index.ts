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
import DeleteArticle from "./delete";
import ReadAllArticles from "./read_all";
import ReadOneArticle from "./read_one";
import UpdateArticle from "./update";

const router = Router();

// Dashboard endpoints
router.use(AuthMiddleware);

router.post("/", ValidationMiddleware(WriteArticle), CreateArticle);

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

router.get(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ReadOneArticle
);

router.delete(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  DeleteArticle
);

export default router;
