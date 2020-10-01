import Router from "express";
import checkToken from "../middlewares/checkToken";
import updateUser from "../controllers/updateUser";

const router = new Router();

router.post("/update", checkToken, updateUser);

export default router;