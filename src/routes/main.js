import { Router } from "express";

const router = new Router();

router.get("*", (req, res) => {
    const isElectronApp = req.header('user-agent').includes('Electron');

    res.render(isElectronApp ? "contest" : "index");
});

export default router;