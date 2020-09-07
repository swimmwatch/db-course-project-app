import { Router } from "express";
import * as authController from "../controllers/auth";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const router = new Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

export default router;