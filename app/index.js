import express from "express";

// Start express
const app = express();
const port = 3001;

// We want our express app to use the stuff in 'public' as static assets
// Static assets are the same for all visitors - nothing personalized or dynamic
// For any route, express will first check the 'public' directory for a corresponding HTML file.
app.use(express.static("public"));

// Since there is no 'hello.html' in 'public,' express will move down here
app.use("/hello", (_, res) => {
  res.send("<p>Hello</p>");
});

app.listen(port, () => {
  console.info("Server running on port 3001");
});
