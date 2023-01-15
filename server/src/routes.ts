import { createPublicNoteSchema } from "./schemas/publicNote.schema";
import {
  createPublicNoteHandler,
  deletePublicNoteHandler,
  deletePublicNotesHandler,
  getPublicNoteHandler,
  getPublicNotesHandler,
  updatePublicNoteHandler,
} from "./controllers/publicnotes.controllers";
import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import {} from "./services/publicNotes.services";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  // create public note
  app.post(
    "/api/publicNotes",
    validateResource(createPublicNoteSchema),
    createPublicNoteHandler
  );
  // update public note
  app.put(
    "/api/publicNotes/:noteId",
    validateResource(createPublicNoteSchema),
    updatePublicNoteHandler
  );
  // get public note
  app.get("/api/publicNotes/:noteId", getPublicNoteHandler);
  app.get("/api/publicNotes/", getPublicNotesHandler);

  // remove public note
  app.delete("/api/publicNotes/:noteId", deletePublicNoteHandler);
  app.delete("/api/publicNotes/", deletePublicNotesHandler);
}
