import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler";
import notesRouter from "./routes/notes.routes";
import authRouter from "./routes/auth.routes";
import { env } from "./configs/env";
import mongoose from "mongoose";

const app = express();

// request middleware
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

let dbReady: Promise<typeof mongoose> | null = null;

app.use(async (_req, _res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  try {
    dbReady ??= mongoose.connect(env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 8000,
    });
    await dbReady;
    next();
  } catch (err) {
    dbReady = null;
    next(err);
  }
});

// routes
app.use("/api/auth", authRouter);
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
