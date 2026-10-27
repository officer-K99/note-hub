import argon2 from "argon2";
import { User } from "../models/User.model";

export const registerUser = async (email: string, password: string) => {
  if (await User.exists({ email })) {
    throw new Error("Email already in use");
  }
  const passwordHash = await argon2.hash(password);
  return await User.create({ email, passwordHash });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  const valid = user?.passwordHash
    ? await argon2.verify(user.passwordHash, password)
    : false;
  if (!user || !valid) throw new Error("Invalid credentials");
  return user;
};
