import type { NotesType } from "../types";
import type { CreateNoteInput } from "../types/noteSchema";
import { apiFetch } from "./client";

const updateNote = async (
  values: CreateNoteInput,
  id: string,
): Promise<NotesType> => {
  const response = await apiFetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error("Could not update note");
  }
  const updatedNote = await response.json();

  return updatedNote.data;
};

export default updateNote;
