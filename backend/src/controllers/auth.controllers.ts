import type { Request, Response } from "express";
import { AppError, asyncHandler } from "../middleware/error-handler";
import { registerSchema, loginSchema } from "../validators/auth.schemas";
import {
  registerUser,
  loginUser,
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
} from "../services/auth.service";
import {
  signAccessToken,
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/token";
import { User } from "../models/User.model";
import type { Role } from "../utils/token";

const publicUser = (u: {
  id: string;
  email?: string | null;
  role: string;
}) => ({
  id: u.id,
  email: u.email,
  role: u.role,
});

const setAuthCookies = (
  res: Response,
  user: { id: string; role: Role },
  refreshToken: string,
) => {
  res.cookie(
    "access_token",
    signAccessToken(user.id, user.role),
    accessCookieOptions,
  );
  res.cookie("refresh_token", refreshToken, refreshCookieOptions);
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = registerSchema.parse(req.body);
  const user = await registerUser(email, password);
  setAuthCookies(res, user, await issueRefreshToken(user.id));
  res.status(201).json({ user: publicUser(user) });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await loginUser(email, password);
  setAuthCookies(res, user, await issueRefreshToken(user.id));
  res.status(200).json({ user: publicUser(user) });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refresh_token;
  if (!token) throw new AppError(401, "Unauthorized");
  const { user, refreshToken } = await rotateRefreshToken(token);
  setAuthCookies(res, user, refreshToken);
  res.status(200).json({ user: publicUser(user) });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refresh_token;
  if (token) await revokeRefreshToken(token);
  res.clearCookie("access_token", {
    ...accessCookieOptions,
    maxAge: undefined,
  });
  res.clearCookie("refresh_token", {
    ...refreshCookieOptions,
    maxAge: undefined,
  });
  res.status(204).end();
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new AppError(401, "Unauthorized");
  res.json({ user: publicUser(user) });
});
