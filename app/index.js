import cors from "cors";
import express from "express";
import termsData from "./db/terms.json" assert { type: "json" };

// Start express
const app = express();

// TODO: Get port from environment variables (via config)
const port = 3001;

app.get("/api/terms", cors({ origin: "http://localhost:5173" }), (req, res) => {
  // 'req.query' is an object that comes from the '?student=josh'
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
app.get("/api/terms/:term", (req, res) => {
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

app.listen(port, () => {
  console.info("Server running on port 3001");
});

// TODO: GET request for reviews

// TODO: GET a single review

// TODO: GET request for a specific review's upvotes

// TODO: POST request to add a review

// TODO: PUT request to upvote a review
