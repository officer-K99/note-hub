import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";
import { env } from "../configs/env";

export type Role = "user" | "admin";

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
