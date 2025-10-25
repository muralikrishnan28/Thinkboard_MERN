import express from "express";
import {
  getAllNotes,
  getOneNote,
  CreateNote,
  UpdateNote,
  DeleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getOneNote);
router.post("/", CreateNote);
router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);

export default router;
