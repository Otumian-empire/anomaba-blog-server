import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import ValidationMiddleware from "../../validations/middleware";
import { WriteArticle } from "../../validations/schemas";
import CreateArticle from "./create";

const router = Router();

// Article end points
router.post(
  "/",
  AuthMiddleware,
  ValidationMiddleware(WriteArticle),
  CreateArticle
);

export default router;
