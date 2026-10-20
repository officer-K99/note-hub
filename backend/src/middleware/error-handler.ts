import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorHandler;
