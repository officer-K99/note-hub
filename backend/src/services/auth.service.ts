import argon2 from "argon2";
import { User } from "../models/User.model";
import { AppError } from "../middleware/error-handler";
import { RefreshToken } from "../models/RefreshToken.model";
import {
  generateRefreshToken,
  hashToken,
  REFRESH_TTL_MS,
} from "../utils/token";

export const registerUser = async (email: string, password: string) => {
  if (await User.exists({ email })) {
    throw new AppError(400, "Email already in use");
  }
  const passwordHash = await argon2.hash(password);
  return await User.create({ email, passwordHash });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+passwordHash");
  const valid = user?.passwordHash
    ? await argon2.verify(user.passwordHash, password)
    : false;
  if (!user || !valid) throw new AppError(400, "Invalid credentials");
  return user;
};

export const issueRefreshToken = async (userId: string) => {
  const token = generateRefreshToken();
  await RefreshToken.create({
    user: userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
  });
  return token;
};

export const rotateRefreshToken = async (token: string) => {
  const stored = await RefreshToken.findOneAndDelete({
    tokenHash: hashToken(token),
  });
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError(401, "Unauthorized");
  }
  const user = await User.findById(stored.user);
  if (!user) throw new AppError(401, "Unauthorized");
  return { user, refreshToken: await issueRefreshToken(user.id) };
};

export const revokeRefreshToken = async (token: string) => {
  await RefreshToken.deleteOne({ tokenHash: hashToken(token) });
};
