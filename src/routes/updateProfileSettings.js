import Router from "express";
import checkToken from "../middlewares/checkToken";
import updateProfileSettings from "../controllers/updateProfileSettings";

const router = new Router();

router.post("/update-settings", checkToken, updateProfileSettings);

export default router;