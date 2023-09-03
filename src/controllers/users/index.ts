import { Router } from "express";

import ValidationMiddleware from "../../validations/middleware";
import { BasicAuth } from "../../validations/schemas";
import SignUp from "./signup";

const router = Router();

// User end points
router.post("/signup", ValidationMiddleware(BasicAuth), SignUp);

export default router;
