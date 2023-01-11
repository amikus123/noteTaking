import { string, object, number, TypeOf, boolean, date } from "zod";

const createPayload = {
  body: object({
    title: string({ required_error: "Title is required" }),
    description: string(),
    priority: number({ required_error: "Priority is required" }),
    deadline: string(),
  }),
};

const payload = {
  body: createPayload.body.extend({ isDone: boolean() }),
};

const params = {
  params: object({
    noteId: string({ required_error: "NoteId is required" }),
  }),
};

export const createPublicNoteSchema = object({ ...createPayload });
export const updatePublicNoteSchema = object({ ...payload, ...params });
export const getPublicNoteSchema = object({ ...params });
export const deletePublicNoteSchema = object({ ...params });

export type CreatePublicNoteInput = TypeOf<typeof createPublicNoteSchema>;
export type UpdatePublicNoteInput = TypeOf<typeof updatePublicNoteSchema>;
export type GetPublicNoteInput = TypeOf<typeof getPublicNoteSchema>;
export type DeletePublicNoteInput = TypeOf<typeof deletePublicNoteSchema>;
