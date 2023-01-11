import mongoose from "mongoose";

export interface PublicNote {
  title: string;
  description?: string;
  // 1 to 5
  priority: number;
  deadline?: Date;
}

export interface PublicNoteDocument extends PublicNote, mongoose.Document {
  createdAt: Date;
  updatedAd: Date;
}

const publicNoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    isDone: { type: Boolean, default: false },
    priority: { type: Number, required: true },
    deadline: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const PublicNoteModel = mongoose.model<PublicNoteDocument>(
  "PublicNote",
  publicNoteSchema
);
export default PublicNoteModel;
