import type { RequestHandler, ErrorRequestHandler } from "express";
import { ZodError, z } from "zod";

export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: z.flattenError(err).fieldErrors,
    });
    return;
  }
  if (err instanceof AppError) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
