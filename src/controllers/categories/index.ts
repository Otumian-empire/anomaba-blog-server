import { Router } from "express";

import AuthMiddleware from "../../auth/middleware";
import ValidationMiddleware from "../../validations/middleware";
import { CreateCategoryValidation } from "../../validations/schemas";
import CreateCategory from "./create";
import DeleteCategory from "./delete";
import ReadAllCategories from "./read";

const router = Router();

// Dashboard endpoints
router.use(AuthMiddleware);

// Public category end points
router.post(
  "/",
  ValidationMiddleware(CreateCategoryValidation),
  CreateCategory
);

router.get("/", ReadAllCategories);

router.delete("/:_id", DeleteCategory);

export default router;
