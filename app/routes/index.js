import { Router } from "express";
import termsRouter from "./terms.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello API!");
});

// /api/terms
router.use("/terms", termsRouter);

export default router;
