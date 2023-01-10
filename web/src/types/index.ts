import { string, object, TypeOf, boolean } from "zod";
export interface PublicNote {
  description: string;
  _id: string;
  title: string;
  isDone: boolean;
}

export const noteCreationSchema = object({
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
});
export type NoteCreationFormValues = TypeOf<typeof noteCreationSchema>;

export const noteUpdateSchema = object({
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  isDone: boolean(),
});
export type NoteUpdateFormValues = TypeOf<typeof noteUpdateSchema>;
