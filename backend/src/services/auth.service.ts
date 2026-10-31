import argon2 from "argon2";
import { User } from "../models/User.model";
import { AppError } from "../middleware/error-handler";

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
