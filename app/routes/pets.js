import { Router } from "express";
import petsData from "../db/pets.json" assert { type: "json" };

const router = new Router();

router.get("/", (_, res) => {
  res.json(petsData);
});

export default router;
