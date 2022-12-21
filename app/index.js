import cors from "cors";
import express from "express";
import router from "./routes/index.js";

// Start express
const app = express();

// TODO: Get port from environment variables (via config)
const port = 3001;

// Add middleware to parse JSON bodies
// This must be added BEFORE the POST request handler
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Any requests that come to "/api" will be handled by the router
app.use("/api", router);

app.listen(port, () => {
  console.info("Server running on port 3001");
});
