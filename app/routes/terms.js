import { Router } from "express";
import termsData from "../db/terms.json" assert { type: "json" };

const router = new Router();

// api/terms
router.get("/", (req, res) => {
  // This will be either 'asc' or 'desc'
  const { sort } = req.query;

  let ret;

  switch (sort) {
    case "asc":
      ret = termsData.sort((a, b) => a.term.localeCompare(b.term));
      break;
    case "desc":
      ret = termsData.sort((a, b) => b.term.localeCompare(a.term));
      break;
    default:
      ret = termsData;
  }

  res.json(ret);
});

// The ':' represents a DYNAMIC PARAMETER. (e.g. '/api/terms/WHATEVERIWANT')
// We can see the name of this parameter as a key in the 'req.params.'
router.get("/:term", (req, res) => {
  const { term } = req.params;

  const requestedTerm = termsData.find(
    (t) => t.term.toUpperCase() === term.toUpperCase()
  );

  if (requestedTerm) {
    res.json(requestedTerm);
  } else {
    res.status(404).json({ error: `Term ${term} not found. :(` });
  }
});

export default router;
