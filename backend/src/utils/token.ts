import jwt from "jsonwebtoken";
import crypto from "crypto";
import type { CookieOptions } from "express";
import { env } from "../configs/env";

export type Role = "user" | "admin";
export const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const signAccessToken = (userId: string, role: Role) => {
  return jwt.sign({ role }, env.JWT_ACCESS_SECRET, {
    subject: userId,
    expiresIn: "15m",
  });
};

export const accessCookieOptions: CookieOptions = {
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 15 * 60 * 1000,
};

export const generateRefreshToken = () =>
  crypto.randomBytes(48).toString("hex");

export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const refreshCookieOptions: CookieOptions = {
  ...accessCookieOptions,
  maxAge: REFRESH_TTL_MS,
  path: "/api/auth",
};
