import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../configs/env";
import { AppError } from "./error-handler";
import type { Role } from "../utils/token";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(new AppError(401, "Unauthorized"));
  }
  try {
    const payload = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET,
    ) as jwt.JwtPayload & { role: Role };
    req.user = { id: payload.sub!, role: payload.role };
    next();
  } catch (err) {
    return next(new AppError(401, "Unauthorized"));
  }
};

export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) =>
    req.user && roles.includes(req.user.role)
      ? next()
      : next(new AppError(403, "Forbidden"));
