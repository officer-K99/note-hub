import express from "express";
import { requireAuth } from "../middleware/auth";
import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.controllers";

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllNotes);

router.post("/", createNote);

router.get("/:id", getNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
