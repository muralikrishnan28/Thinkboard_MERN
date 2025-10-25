import Note from "../models/Note.js";
import mongoose from "mongoose";

export async function getAllNotes(req, res) {
  try {
    const allNotes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(allNotes);
  } catch (error) {
    console.error(`Error in getAllNotes: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOneNote(req, res) {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid Note Id" });
    }
    const note = await Note.findById(id);
    if(!note){
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(`Error in getOneNote: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function CreateNote(req, res) {
  try {
    const { title, content } = req.body;
    if(!title.trim() || !content.trim()){
      return res.status(400).json({ message: "Title and Content are required."})
    }
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(`Error in CreateNote: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function UpdateNote(req, res) {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid Note Id" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote){
      return res.status(404).json({ message: "Note Not Found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(`Error in UpdateNote: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function DeleteNote(req, res) {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid Note Id" });
    }
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) return res.status(404).json({ message: "Note Not Found" });
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.error(`Error in DeleteNote: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
