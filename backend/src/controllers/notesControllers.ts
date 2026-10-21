const getAllNotes = (_req, res) => {
  res.status(200).json({
    message: "notes fetched successfully",
  });
};

const createNote = (_req, res) => {
  res.status(200).json({
    message: "note created successfully",
  });
};

const getNote = (_req, res) => {
  res.status(200).json({
    message: "note fetched successfully",
  });
};
const updateNote = (_req, res) => {
  res.status(200).json({
    message: "notes updated successfully",
  });
};

const deleteNote = (_req, res) => {
  res.status(200).json({
    message: "note deleted successfully",
  });
};

export { getAllNotes, getNote, createNote, updateNote, deleteNote };
