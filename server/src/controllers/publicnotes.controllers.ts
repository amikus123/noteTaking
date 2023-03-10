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
  deletePublicNotes,
} from "../services/publicNotes.services";
import omit from "lodash/omit";
import logger from "../utils/logger";
import { textToDate } from "../utils/date";
import { pick } from "lodash";

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
  } catch (e: any) {
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
  } catch (e: any) {
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
  } catch (e: any) {
    logger.error("Error when gettinh public note: ", e);
    return res.status(400).send(e.message);
  }
};

export const getPublicNotesHandler = async (
  req: Request<GetPublicNoteInput["params"]>,
  res: Response
) => {
  try {
    const query = omit(req.query, "sort");
    const sort = (req.query.sort as string) || "";
    const publicNotes = await getAllPublicNotes(query, sort);
    return res.send(publicNotes);
  } catch (e: any) {
    logger.error("Error when gettinh public note: ", e);
    return res.status(400).send(e.message);
  }
};

export const deletePublicNoteHandler = async (
  req: Request<DeletePublicNoteInput["params"]>,
  res: Response
) => {
  try {
    console.log("XXX", req.query);
    const noteId = req.params.noteId;
    const publicNote = await findPublicNote({ _id: noteId });
    if (!publicNote) {
      return res.sendStatus(404);
    }
    const deletedNote = await deletePublicNote({ _id: noteId });
    return res.sendStatus(200);
  } catch (e: any) {
    logger.error("Error when deleting public note: ", e);
    return res.status(400).send(e.message);
  }
};
export const deletePublicNotesHandler = async (
  req: Request<DeletePublicNoteInput["params"]>,
  res: Response
) => {
  try {
    console.log(req.query);
    const deletedNote = await deletePublicNotes(req.query);
    return res.sendStatus(200);
  } catch (e: any) {
    logger.error("Error when deleting public note: ", e);
    return res.status(400).send(e.message);
  }
};
