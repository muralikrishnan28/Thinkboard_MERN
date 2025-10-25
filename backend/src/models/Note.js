import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
