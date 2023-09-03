import { Router } from "express";

import ValidationMiddleware from "../../../validations/middleware";
import { BasicAuth } from "../../../validations/schemas";
import Login from "./login";
import SignUp from "./signup";

const router = Router();

// User end points
router.post("/signup", ValidationMiddleware(BasicAuth), SignUp);
router.post("/login", ValidationMiddleware(BasicAuth), Login);

export default router;
