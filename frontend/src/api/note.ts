import type { NotesType } from "../types";

const API_URL = import.meta.env.VITE_BASE_URL;

const getNote = async (id: string | undefined): Promise<NotesType> => {
  const fetchedNote = await fetch(`${API_URL}/api/notes/${id}`, {
    credentials: "include",
  });
  if (!fetchedNote.ok) {
    throw new Error("could not fetch note");
  }
  const note = await fetchedNote.json();

  return note.data;
};

export default getNote;
