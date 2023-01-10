import axios from "axios";
import getConfig from "next/config";
import Image from "next/image";
import React, { useState } from "react";
import { ChangeToastData } from "../../../pages/_app";
import { PublicNote } from "../../types";
import CardToggle from "./CardToggle";
import NoteEditMode from "./NoteEditMode";
import omit from "lodash/omit";
interface PublicNoteItemProps {
  publicNote: PublicNote;
  changeToastData: ChangeToastData;
  removeNote: (id: string) => void;
  updateNote: (id: string, newState: PublicNote) => void;
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
  const [editMode, setEditMode] = useState(false);
  const { _id, description, isDone, title } = publicNote;
  const toggleDone = async () => {
    axios
      .put(`${API_HOST}/api/publicNotes/${_id}`, {
        ...publicNote,
        isDone: !isDone,
      })
      .then(() => {
        changeToastData("Changes were successful", "green");
        updateNote(_id, { ...publicNote, isDone: !isDone });
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
  return (
    <li
      className={`w-full h-auto 
    border shadow-md
    flex
    flex-col
    gap-4
    rounded
    p-4 ${editMode ? "bg-white" : isDone ? "bg-green-400" : "bg-red-400"}`}
    >
      {editMode ? (
        <NoteEditMode
          setEditMode={setEditMode}
          data={publicNote}
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
          <p className="">Title: {title}</p>
          <p>Description: {description}</p>
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
