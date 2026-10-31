import type { LoginInput, RegisterInput, User } from "../types/authSchemas";
import { apiFetch } from "./client";

const API_URL = import.meta.env.VITE_BASE_URL;

const post = async (
  path: string,
  body: unknown,
  fallback: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message ?? fallback);
  }
};

export const login = (input: LoginInput) =>
  post("login", input, "Invalid email or password");

export const register = (input: RegisterInput) =>
  post("register", input, "Could not create account");

const unwrap = (body: any): User => {
  const user = body?.data?.user ?? body?.data ?? body?.user;
  if (!user) throw new Error("Unexpected server response");
  return user;
};

export const getMe = async (): Promise<User | null> => {
  const response = await apiFetch("/api/auth/me", { cache: "no-store" });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Could not fetch user");

  return unwrap(await response.json());
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Could not log out");
};
