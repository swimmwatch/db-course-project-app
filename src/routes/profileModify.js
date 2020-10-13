import Router from "express";
import multer from "multer";
import checkToken from "../middlewares/checkToken";
import * as profileModify from "../controllers/profileModify";

const upload = multer();
const router = new Router();

router.post("/update-password", upload.none(), checkToken, profileModify.updatePassword);
router.post("/remove", checkToken, profileModify.remove);

export default router;