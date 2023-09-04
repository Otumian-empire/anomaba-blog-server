import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import ValidationMiddleware from "../../validations/middleware";
import { AddComment, IdParameter } from "../../validations/schemas";
import CreateComment from "./create";
import { RequestType } from "../../utils/constants";
import ReadOneComment from "./read_one";

const router = Router();

// Comment end points
router.use(AuthMiddleware);

router.post("/", ValidationMiddleware(AddComment), CreateComment);

router.get(
  "/:_id",
  ValidationMiddleware(IdParameter, RequestType.PARAMS),
  ReadOneComment
);

export default router;
