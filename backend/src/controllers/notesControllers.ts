import type { Request, Response } from "express";
import Note from "../models/Note";

const getAllNotes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      message: "notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      message: "could not fetch any notes",
    });
  }
};

const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const createdNote = await Note.create(reqBody);

    res.status(201).json({
      message: "note created successfully",
      data: createdNote,
    });
  } catch (err) {
    res.status(500).json({
      message: "could not create note",
    });
  }
};

const getNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("could not find note id");
    }
    const note = await Note.findById(id);
    if (!note) {
      res.status(400).json({
        message: "note does not exist",
      });
      return;
    }
    res.status(200).json({
      message: "note fetched successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      message: "could not find note",
    });
  }
};
const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const reqBody = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updateNote) {
      res.status(400).json({
        message: "could not find note",
      });
      return;
    }
    res.status(200).json({
      message: "note updated successfully",
      data: updatedNote,
    });
  } catch (err) {
    res.status(500).json({
      message: "could not update note",
    });
  }
};

const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("request body is empty");
    }
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }
    res.status(200).json({
      message: "note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "could not delete note",
    });
  }
};

export { getAllNotes, getNote, createNote, updateNote, deleteNote };
