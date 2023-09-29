import { Router } from "express";

import articles from "./articles";
import comments from "./comments";
import dashboard from "./dashboard";
import users from "./users";
import categories from "./categories";

const router = Router();

// User
router.use("/users", users);

// Dashboard
router.use("/dashboard", dashboard);

// Articles
router.use("/articles", articles);

// Comments
router.use("/comments", comments);

// Category
router.use("/categories", categories);

export default router;
