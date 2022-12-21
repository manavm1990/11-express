import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import petsData from "./db/pets.json" assert { type: "json" };
import reviewsData from "./db/reviews.json" assert { type: "json" };
import termsData from "./db/terms.json" assert { type: "json" };

// Import the 'promises' object from the 'fs' module and rename it to 'fs'
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Start express
const app = express();

// TODO: Get port from environment variables (via config)
const port = 3001;

app.get("/api/terms", cors({ origin: "http://localhost:5173" }), (req, res) => {
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

app.get("/api/pets", cors({ origin: "http://localhost:5173" }), (_, res) => {
  res.json(petsData);
});

app.get("/api/reviews", (_, res) => {
  res.json(reviewsData);
});

app.get("/api/reviews/:id", (req, res) => {
  const { id } = req.params;

  // Find the review whose 'review_id' matches the id from the DYNAMIC PARAMETER in 'req.params'
  const requestedReview = reviewsData.find((review) => review.review_id === id);

  if (requestedReview) {
    res.json(requestedReview);
  } else {
    res.status(404).json({ error: `Review ${id} not found. :(` });
  }
});

app.get("/api/reviews/:id/upvotes", (req, res) => {
  const { id } = req.params;

  // Find the review whose 'review_id' matches the id from the DYNAMIC PARAMETER in 'req.params'
  const requestedReview = reviewsData.find((review) => review.review_id === id);

  if (requestedReview) {
    res.json({ upvotes: requestedReview.upvotes });
  } else {
    res.status(404).json({ error: `Review ${id} not found. :(` });
  }
});

// Add middleware to parse JSON bodies
// This must be added BEFORE the POST request handler
app.use(express.json());

// Use this to create a new review
app.post("/api/reviews", async (req, res) => {
  const { product, username, review } = req.body;

  const newReview = {
    ...req.body,
    review_id: uuidv4(),
    upvotes: 0,
  };

  try {
    // TODO: Remove any properties from the body that don't belong
    if (product && username && review) {
      await fs.writeFile(
        `${path.dirname(fileURLToPath(import.meta.url))}/db/reviews.json`,
        JSON.stringify([...reviewsData, newReview], null, 2),
        "utf-8"
      );
      res.status(201).json({ status: "success", body: newReview });
    } else {
      res.status(400).json({ error: "Missing required properties" });
    }
  } catch (err) {
    res.status(500).json({ error: `Something went wrong. ${err.message}` });
  }
});

// TODO: PUT request to upvote a review

app.listen(port, () => {
  console.info("Server running on port 3001");
});
