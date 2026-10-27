import type { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import Note from "../models/Note.model";
import { AppError } from "../middleware/error-handler";
import { createNoteSchema, updateNoteSchema } from "../validators/note.schemas";

const getNoteId = (req: Request): string | void => {
  const id = req.params.id;
  if (!id || !isValidObjectId(id)) throw new AppError(404, "Note not found");
  if (typeof id == "string") {
    return id;
  }
};

const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const notes = await Note.find({ owner: req.user!.id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ message: "notes fetched successfully", data: notes });
  } catch (err) {
    next(err);
  }
};

const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = createNoteSchema.parse(req.body);
    const note = await Note.create({ ...data, owner: req.user!.id });
    res.status(201).json({ message: "note created successfully", data: note });
  } catch (err) {
    next(err);
  }
};

const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const note = await Note.findOne({
      _id: getNoteId(req),
      owner: req.user!.id,
    });
    if (!note) throw new AppError(404, "Note not found");
    res.status(200).json({ message: "note fetched successfully", data: note });
  } catch (err) {
    next(err);
  }
};
const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = updateNoteSchema.parse(req.body);
    const note = await Note.findOneAndUpdate(
      { _id: getNoteId(req), owner: req.user!.id },
      data,
      { new: true },
    );
    if (!note) throw new AppError(404, "Note not found");
    res.status(200).json({ message: "note updated successfully", data: note });
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const note = await Note.findOneAndDelete({
      _id: getNoteId(req),
      owner: req.user!.id,
    });
    if (!note) throw new AppError(404, "Note not found");
    res.status(200).json({ message: "note deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export { getAllNotes, getNote, createNote, updateNote, deleteNote };
