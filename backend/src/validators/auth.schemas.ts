import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(5).max(25),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
