import express from "express";
import termsData from "./db/terms.json" assert { type: "json" };

// Start express
const app = express();
const port = 3001;

app.get("/api/terms", (_, res) => {
  res.json(termsData);
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
