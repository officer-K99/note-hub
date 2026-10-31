import type { NotesType } from "../types";
import { apiFetch } from "./client";

const getNote = async (id: string | undefined): Promise<NotesType> => {
  const fetchedNote = await apiFetch(`/api/notes/${id}`);
  if (!fetchedNote.ok) {
    throw new Error("could not fetch note");
  }
  const note = await fetchedNote.json();

  return note.data;
};

export default getNote;
