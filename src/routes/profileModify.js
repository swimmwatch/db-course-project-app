import Router from "express";
import checkToken from "../middlewares/checkToken";
import * as profileModify from "../controllers/profileModify";

const router = new Router();

router.post("/update", checkToken, profileModify.update);
router.post("/remove", checkToken, profileModify.remove);

export default router;