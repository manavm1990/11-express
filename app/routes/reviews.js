import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import reviewsData from "../db/reviews.json" assert { type: "json" };

const router = new Router();

router.get("/", (_, res) => {
  res.json(reviewsData);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // Find the review whose 'review_id' matches the id from the DYNAMIC PARAMETER in 'req.params'
  const requestedReview = reviewsData.find((review) => review.review_id === id);

  if (requestedReview) {
    res.json(requestedReview);
  } else {
    res.status(404).json({ error: `Review ${id} not found. :(` });
  }
});

router.get("/:id/upvotes", (req, res) => {
  const { id } = req.params;

  // Find the review whose 'review_id' matches the id from the DYNAMIC PARAMETER in 'req.params'
  const requestedReview = reviewsData.find((review) => review.review_id === id);

  if (requestedReview) {
    res.json({ upvotes: requestedReview.upvotes });
  } else {
    res.status(404).json({ error: `Review ${id} not found. :(` });
  }
});

// Use this to create a new review
router.post("/", async (req, res) => {
  const { product, username, review } = req.body;

  const newReview = {
    ...req.body,
    review_id: uuidv4(),
    upvotes: 0,
  };

  // TODO: Remove any properties from the body that don't belong
  if (product && username && review) {
    try {
      await fs.writeFile(
        // TODO: Fix this path
        `${path.dirname(fileURLToPath(import.meta.url))}/db/reviews.json`,
        JSON.stringify([...reviewsData, newReview], null, 2),
        "utf-8"
      );
      res.status(201).json({ status: "success", body: newReview });
    } catch (err) {
      res.status(500).json({ error: `Something went wrong. ${err.message}` });
    }
  } else {
    res.status(400).json({ error: "Missing required properties" });
  }
});

router.put("/:id/upvotes", async (req, res) => {
  const { id } = req.params;

  const requestedReview = reviewsData.find((review) => review.review_id === id);

  if (requestedReview) {
    const updatedReview = {
      ...requestedReview,

      // This will override what we just spread out
      upvotes: requestedReview.upvotes + 1,
    };

    try {
      await fs.writeFile(
        `${path.dirname(fileURLToPath(import.meta.url))}/db/reviews.json`,
        JSON.stringify(
          reviewsData.map((review) =>
            // If the review's id matches the id from the DYNAMIC PARAMETER, return the updated review otherwise, keep the review as is
            review.review_id === id ? updatedReview : review
          ),
          null,
          2
        ),
        "utf-8"
      );
      res.json(updatedReview);
    } catch (err) {
      res.status(500).json({ error: `Something went wrong. ${err.message}` });
    }
  } else {
    res.status(404).json({ error: `Review ${id} not found. :(` });
  }
});

export default router;
