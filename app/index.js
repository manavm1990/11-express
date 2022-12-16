import express from "express";

// Start express
const app = express();
const port = 3001;

app.get("/", (_, res) => {
  res.send(
    `<p>API - An application programming interface, is a computing interface that defines interactions between multiple software intermediaries</p>`
  );
});

app.get("/api", (_, res) => {
  res.json({
    term: "api",
    description:
      "An application programming interface, is a computing interface that defines interactions between multiple software intermediaries",
  });
});

app.listen(port, () => {
  console.info("Server running on port 3001");
});
