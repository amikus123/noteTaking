import axios from "axios";
import getConfig from "next/config";
import Image from "next/image";
import React from "react";
import { ChangeToastData } from "../../../pages/_app";
import CardToggle from "./CardToggle";
import NoteEditMode from "./NoteEditMode";
import { PublicNoteState } from "../../../pages";
import { dateToString } from "../../utils/dates";
interface PublicNoteItemProps {
  publicNote: PublicNoteState;
  changeToastData: ChangeToastData;
  removeNote: (id: string) => void;
  updateNote: (id: string, newState: PublicNoteState) => void;
}

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

const PublicNoteItem = ({
  publicNote,
  changeToastData,
  removeNote,
  updateNote,
}: PublicNoteItemProps) => {
  const { isEditing, data } = publicNote;
  const { _id, description, isDone, title, priority, deadline } = data;
  const toggleDone = async () => {
    console.log({ data });
    axios
      .put(`${API_HOST}/api/publicNotes/${_id}`, {
        ...data,
        isDone: !isDone,
      })
      .then(() => {
        changeToastData("Changes were successful", "green");
        updateNote(_id, {
          isEditing,
          data: { ...publicNote.data, isDone: !isDone },
        });
      })
      .catch(() => {
        changeToastData("Something went wrong", "red");
      });
  };
  const deleteCard = () => {
    axios
      .delete(`${API_HOST}/api/publicNotes/${_id}`)
      .then(() => {
        changeToastData("Element has been deleted", "green");
        removeNote(_id);
      })
      .catch(() => {
        changeToastData("Something went wrong", "red");
      });
  };

  const setEditMode = (value: boolean) => {
    updateNote(_id, { isEditing: value, data: { ...data } });
  };
  return (
    <li
      className={`w-full h-auto 
    border shadow-md
    flex
    flex-col
    gap-4
    rounded
    p-4 ${isEditing ? "bg-white" : isDone ? "bg-green-400" : "bg-red-400"}`}
    >
      {isEditing ? (
        <NoteEditMode
          setEditMode={setEditMode}
          publicNote={publicNote}
          changeToastData={changeToastData}
          updateNote={updateNote}
        />
      ) : (
        <>
          <div className="w-full flex justify-end">
            <Image
              src="x.svg"
              width={16}
              height={16}
              alt="X"
              className="cursor-pointer"
              onClick={deleteCard}
            />
          </div>
          <p className={`${isDone && "line-through"}`}>Title: {title}</p>
          {description && (
            <p className={`${isDone && "line-through"}`}>
              Description: {description}
            </p>
          )}
          <p className={`${isDone && "line-through"}`}>Priority: {priority}</p>
          {deadline && (
            <p className={`${isDone && "line-through"}`}>
              Deadline: {dateToString(deadline)}
            </p>
          )}
          <CardToggle isDone={isDone} toggleDone={toggleDone} />
          <p
            className="cursor-pointer"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit card
          </p>
        </>
      )}
    </li>
  );
};

export default PublicNoteItem;
