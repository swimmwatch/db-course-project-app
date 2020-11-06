import { Router } from "express";
import * as testEditor from "../controllers/testEditor";
import checkToken from "../middlewares/checkToken";

const router = new Router();

router.post("/create", checkToken, testEditor.create);
router.put("/update", checkToken, testEditor.update);
router.post("/update", checkToken, testEditor.getTestForEdit);
router.get("/pass", checkToken, testEditor.getTestForPassing);
router.get("/result", checkToken, testEditor.getAttemptResults);
router.post("/check", checkToken, testEditor.check);
router.get("/profile", checkToken, testEditor.getOwnTests);
router.get("/all", checkToken, testEditor.getAllTests);
router.delete("/delete", checkToken, testEditor.deleteTest);

export default router;