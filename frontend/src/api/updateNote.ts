import type { NotesType } from "../types";
import type { CreateNoteInput } from "../types/noteSchema";

const API_URL = import.meta.env.VITE_BASE_URL;

const updateNote = async (
  values: CreateNoteInput,
  id: string,
): Promise<NotesType> => {
  const response = await fetch(`${API_URL}/api/notes/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error("Could not update note");
  }
  const updatedNote = await response.json();

  return updatedNote.data;
};

export default updateNote;
