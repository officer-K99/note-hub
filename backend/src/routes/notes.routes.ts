import express from "express";
import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.controllers";

const notesRouter = express.Router();

notesRouter.get("/", getAllNotes);

notesRouter.post("/", createNote);

notesRouter.get("/:id", getNote);

notesRouter.put("/:id", updateNote);

notesRouter.delete("/:id", deleteNote);

export default notesRouter;
