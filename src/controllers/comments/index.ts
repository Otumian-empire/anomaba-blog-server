import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import ValidationMiddleware from "../../validations/middleware";
import { AddComment } from "../../validations/schemas";
import CreateComment from "./create";

const router = Router();

router.use(AuthMiddleware);

// Comment end points
router.post("/", ValidationMiddleware(AddComment), CreateComment);

export default router;
