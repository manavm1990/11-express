import { Router } from "express";
import termsRouter from "./terms.js";
import petsRouter from "./pets.js";
import reviewsRouter from "./reviews.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello API!");
});

// /api/terms
router.use("/terms", termsRouter);
router.use("/pets", petsRouter);
router.use("/reviews", reviewsRouter);

export default router;
