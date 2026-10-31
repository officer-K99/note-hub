import type { Request, Response } from "express";
import { AppError, asyncHandler } from "../middleware/error-handler";
import { registerSchema, loginSchema } from "../validators/auth.schemas";
import { registerUser, loginUser } from "../services/auth.service";
import { signAccessToken, accessCookieOptions } from "../utils/token";
import { User } from "../models/User.model";

const publicUser = (u: {
  id: string;
  email?: string | null;
  role: string;
}) => ({
  id: u.id,
  email: u.email,
  role: u.role,
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = registerSchema.parse(req.body);
  const user = await registerUser(email, password);
  res.cookie(
    "access_token",
    signAccessToken(user.id, user.role),
    accessCookieOptions,
  );
  res.status(201).json({ user: publicUser(user) });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await loginUser(email, password);
  res.cookie(
    "access_token",
    signAccessToken(user.id, user.role),
    accessCookieOptions,
  );
  res.status(200).json({ user: publicUser(user) });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    ...accessCookieOptions,
    maxAge: undefined,
  });
  res.status(204).end();
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new AppError(401, "Unauthorized");
  res.json({ user: publicUser(user) });
});
