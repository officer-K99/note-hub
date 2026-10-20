import express from "express";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "./middleware/error-handler";
import notesRouter from "./routes/notesRoutes";

const app = express();

// request middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// routes
app.use("/api/notes", notesRouter);

// health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

// not found
app.use((_req, res) => {
  res.status(404).json({
    message: "route not found!",
  });
});

app.use(errorHandler);

export default app;
