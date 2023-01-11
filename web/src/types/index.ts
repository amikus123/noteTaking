import { string, object, TypeOf, boolean, date, number } from "zod";
export interface PublicNote {
  title: string;
  description?: string;
  isDone: boolean;
  priority: number;
  deadline?: Date;
  _id: string;
}
export const noteCreationSchema = object({
  title: string().min(1, "Title is required"),
  description: string(),
  priority: number()
    .min(1, "Priority is required")
    .max(5, "Priority can't be higher than 5"),
  deadline: string(),
});
export type NoteCreationFormValues = TypeOf<typeof noteCreationSchema>;

export const noteUpdateSchema = noteCreationSchema.extend({
  isDone: boolean(),
});

export type NoteUpdateFormValues = TypeOf<typeof noteUpdateSchema>;
