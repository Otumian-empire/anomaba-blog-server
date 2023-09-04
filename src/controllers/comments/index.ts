import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import { RequestType } from "../../utils/constants";
import ValidationMiddleware from "../../validations/middleware";
import {
  AddComment,
  IdParameter,
  PaginationQuery,
  UpdateCommentValidation
} from "../../validations/schemas";
import CreateComment from "./create";
import DeleteComment from "./delete";
import ReadAllComment from "./read_all";
import ReadOneComment from "./read_one";
import UpdateComment from "./update";

const router = Router();

// Comment end points
router.use(AuthMiddleware);

router.post("/", ValidationMiddleware(AddComment), CreateComment);

router.get(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ReadOneComment
);

router.get(
  "/article/:_id",
  ValidationMiddleware(PaginationQuery, RequestType.QUERY),
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ReadAllComment
);

router.put(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ValidationMiddleware(UpdateCommentValidation),
  UpdateComment
);

router.delete(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  DeleteComment
);

export default router;
