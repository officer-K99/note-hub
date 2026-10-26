const API_URL = import.meta.env.VITE_BASE_URL;

const deleteNote = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("could not delete the note");
  }
};

export default deleteNote;
