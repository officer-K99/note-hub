import type { NotesType } from "../types";
import { apiFetch } from "./client";

const getNotes = async (): Promise<NotesType[]> => {
  const fetchedNotes = await apiFetch("/api/notes");
  if (!fetchedNotes.ok) {
    throw new Error("could not fetch notes");
  }
  const notes = await fetchedNotes.json();
  return notes.data;
};

export { getNotes };
