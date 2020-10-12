import { Router } from "express";
import * as testEditor from "../controllers/testEditor";
import checkToken from "../middlewares/checkToken";

const router = new Router();

router.post("/create", checkToken, testEditor.create);
router.post("/update:testId", checkToken, testEditor.update);
router.get("/profile", checkToken, testEditor.getOwnTests);
router.delete("/delete", checkToken, testEditor.deleteTest);

export default router;