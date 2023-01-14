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
  priority: number().refine(
    (number) => {
      console.log(number, number < 1 || number > 5);
      if (number < 1 || number > 5) {
        return false;
      }
      return true;
    },
    { message: "Priority should be between 1 and 5" }
  ),
  deadline: date(),
});
export type NoteCreationFormValues = TypeOf<typeof noteCreationSchema>;

export const noteUpdateSchema = noteCreationSchema.extend({
  isDone: boolean(),
});

export type NoteUpdateFormValues = TypeOf<typeof noteUpdateSchema>;
