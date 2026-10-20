import express from "express";

const notesRouter = express.Router();

notesRouter.get("/", (_req, res) => {
  res.status(200).json({
    message: "notes fetched successfully",
  });
});

notesRouter.post("/", (_req, res) => {
  res.status(200).json({
    message: "note created successfully",
  });
});

notesRouter.get("/:id", (_req, res) => {
  res.status(200).json({
    message: "note fetched successfully",
  });
});

notesRouter.put("/:id", (_req, res) => {
  res.status(200).json({
    message: "notes updated successfully",
  });
});

notesRouter.delete("/:id", (_req, res) => {
  res.status(200).json({
    message: "note deleted successfully",
  });
});

export default notesRouter;
