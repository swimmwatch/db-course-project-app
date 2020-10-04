import Router from "express";
import checkToken from "../middlewares/checkToken";
import * as profileModify from "../controllers/profileModify";

const router = new Router();

router.post("/update-password", checkToken, profileModify.updatePassword);
router.post("/remove", checkToken, profileModify.remove);

export default router;