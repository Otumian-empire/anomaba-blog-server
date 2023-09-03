import { Router } from "express";

import AuthRoute from "./auth";

const router = Router();

// User auth end points
router.use("/auth", AuthRoute);

export default router;
