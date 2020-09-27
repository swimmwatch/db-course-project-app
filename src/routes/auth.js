import multer from "multer";
import { Router } from "express";
import * as authController from "../controllers/auth";

const upload = multer();

const router = new Router();

router.post('/signup', upload.none(), authController.signup);
router.post('/signin', upload.none(), authController.signin);

export default router;