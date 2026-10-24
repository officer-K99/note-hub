import type { CreateNoteInput } from "../types/noteSchema";
import type { NotesType } from "../types/index";
const API_URL = import.meta.env.VITE_BASE_URL;

const createNote = async (input: CreateNoteInput): Promise<NotesType> => {
  const response = await fetch(`${API_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error("could not send data");
  }
  const createdNote = await response.json();
  return createdNote.data;
};

export default createNote;
