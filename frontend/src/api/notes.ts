import type { NotesType } from "../types";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getNotes = async (): Promise<NotesType[]> => {
  const fetchedNotes = await fetch(`${API_BASE_URL}/api/notes`, {
    credentials: "include",
  });
  if (!fetchedNotes.ok) {
    throw new Error("could not fetch notes");
  }
  const notes = await fetchedNotes.json();
  return notes.data;
};

export { getNotes };
