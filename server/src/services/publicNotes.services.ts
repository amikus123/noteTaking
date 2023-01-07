import { PublicNote, PublicNoteDocument } from "./../models/publicNotes.models";
import PublicNoteModel from "../models/publicNotes.models";
import { CreatePublicNoteInput } from "../schemas/publicNote.schema";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";

export const createPublicNote = (input: DocumentDefinition<PublicNote>) => {
  return PublicNoteModel.create(input);
};

export const updatePublicNote = (
  query: FilterQuery<PublicNoteDocument>,
  update: CreatePublicNoteInput,
  options: QueryOptions = { lean: true }
) => {
  return PublicNoteModel.findOneAndUpdate(query, update, options);
};

export const findPublicNote = (
  query: FilterQuery<PublicNoteDocument>,
  options: QueryOptions = { lean: true }
) => {
  return PublicNoteModel.findOne(query, {}, options);
};

export const deletePublicNote = (query: FilterQuery<PublicNoteDocument>) => {
  return PublicNoteModel.deleteOne(query);
};
