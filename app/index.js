import express from "express";
import terms from "./db/terms.json" assert { type: "json" };

// Start express
const app = express();
const port = 3001;

app.get("/api", (_, res) => {
  res.json(terms);
});

app.listen(port, () => {
  console.info("Server running on port 3001");
});
