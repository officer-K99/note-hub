import { apiFetch } from "./client";

const deleteNote = async (id: string): Promise<void> => {
  const response = await apiFetch(`/api/notes/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("could not delete the note");
  }
};

export default deleteNote;
