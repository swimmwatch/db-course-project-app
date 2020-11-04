import { Router } from "express";
import * as attemptsController from "../controllers/attempt";
import checkToken from "../middlewares/checkToken";

const router = new Router();

router.get("/profile", checkToken, attemptsController.getOwnAttempts);
router.get("/test", checkToken, attemptsController.getOwnTestAttempts);

export default router;