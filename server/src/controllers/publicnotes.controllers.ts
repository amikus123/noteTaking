import { Request, Response } from "express";
import {
  CreatePublicNoteInput,
  DeletePublicNoteInput,
  GetPublicNoteInput,
  UpdatePublicNoteInput,
} from "../schemas/publicNote.schema";
import {
  createPublicNote,
  updatePublicNote,
  deletePublicNote,
  findPublicNote,
  getAllPublicNotes,
} from "../services/publicNotes.services";
import omit from "lodash/omit";
import logger from "../utils/logger";
import { textToDate } from "../utils/date";

export const createPublicNoteHandler = async (
  req: Request<{}, {}, CreatePublicNoteInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const publicNote = await createPublicNote({
      ...body,
      deadline: body.deadline ? textToDate(body.deadline) : undefined,
    });
    return res.send(publicNote);
  } catch (e) {
    logger.error("Error when adding public note: ", e);
    return res.status(400).send(e.message);
  }
};

export const updatePublicNoteHandler = async (
  req: Request<
    UpdatePublicNoteInput["params"],
    {},
    UpdatePublicNoteInput["body"]
  >,
  res: Response
) => {
  try {
    const body = req.body;
    const noteId = req.params.noteId;
    const publicNote = await findPublicNote({ _id: noteId });
    if (!publicNote) {
      return res.sendStatus(404);
    }
    const updatedProduct = await updatePublicNote(
      { _id: noteId },
      { ...omit(body, "_id") }
    );

    return res.send(updatedProduct);
  } catch (e) {
    logger.error("Error when adding public note: ", e.message);
    console.log(e);
    return res.status(400).send(e.message);
  }
};

export const getPublicNoteHandler = async (
  req: Request<GetPublicNoteInput["params"]>,
  res: Response
) => {
  try {
    const noteId = req.params.noteId;
    const publicNote = await findPublicNote({ _id: noteId });
    if (!publicNote) {
      return res.sendStatus(404);
    }
    return res.send(publicNote);
  } catch (e) {
    logger.error("Error when gettinh public note: ", e);
    return res.status(400).send(e.message);
  }
};

export const getPublicNotesHandler = async (
  req: Request<GetPublicNoteInput["params"]>,
  res: Response
) => {
  try {
    const publicNotes = await getAllPublicNotes();
    return res.send(publicNotes);
  } catch (e) {
    logger.error("Error when gettinh public note: ", e);
    return res.status(400).send(e.message);
  }
};

export const deletePublicNoteHandler = async (
  req: Request<DeletePublicNoteInput["params"]>,
  res: Response
) => {
  try {
    const noteId = req.params.noteId;
    const publicNote = await findPublicNote({ _id: noteId });
    if (!publicNote) {
      return res.sendStatus(404);
    }
    const deletedNote = await deletePublicNote({ _id: noteId });
    return res.sendStatus(200);
  } catch (e) {
    logger.error("Error when deleting public note: ", e);
    return res.status(400).send(e.message);
  }
};
