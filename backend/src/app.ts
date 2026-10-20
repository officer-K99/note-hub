import express from "express";

const app = express();

// health check route
app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "server is running" });
});

export default app;
