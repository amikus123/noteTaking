import mongoose from "mongoose";

export interface PublicNote {
  title: string;
  description: string;
}

export interface PublicNoteDocument extends PublicNote, mongoose.Document {
  createdAt: Date;
  updatedAd: Date;
}


const publicNoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false ,},
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
