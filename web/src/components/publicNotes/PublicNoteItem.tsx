import axios from "axios";
import getConfig from "next/config";
import Image from "next/image";
import React, { useState } from "react";
import { PublicNote } from "../../../pages/publicNotes";
import { ChangeToastData } from "../../../pages/_app";
import CardInteractions from "./CardInteractions";

interface PublicNoteItemProps {
  publicNote: PublicNote;
  changeToastData: ChangeToastData;
  removeNote: (id: string) => void;
}

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

const PublicNoteItem = ({
  publicNote,
  changeToastData,
  removeNote,
}: PublicNoteItemProps) => {
  const [dynamicState, setDynamicState] = useState<PublicNote>({
    _id: publicNote._id,
    description: publicNote.description,
    isDone: publicNote.isDone,
    title: publicNote.title,
  });
  const { _id, description, isDone, title } = dynamicState;

  const toggleDone = async () => {
    axios
      .put(`${API_HOST}/api/publicNotes/${_id}`, {
        ...dynamicState,
        isDone: !isDone,
      })
      .then(() => {
        changeToastData("Changes were successful", "green");
        setDynamicState({ ...dynamicState, isDone: !isDone });
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
    p-4 ${isDone ? "bg-green-400" : "bg-red-400"}`}
    >
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
      <CardInteractions isDone={isDone} toggleDone={toggleDone} />
    </li>
  );
};

export default PublicNoteItem;
