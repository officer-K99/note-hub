import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(100),
  content: z.string().min(1).max(5000),
});

export const updateNoteSchema = createNoteSchema.partial();
