import axios from "axios";
import getConfig from "next/config";
import Image from "next/image";
import React, { useState } from "react";
import { PublicNote } from "../../../pages/publicNotes";
import CardInteractions from "./CardInteractions";

interface PublicNoteItemProps {
  publicNote: PublicNote;
}

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

const PublicNoteItem = ({ publicNote }: PublicNoteItemProps) => {
  const [dynamicState, setDynamicState] = useState<PublicNote>({
    _id: publicNote._id,
    description: publicNote.description,
    isDone: publicNote.isDone,
    title: publicNote.title,
  });
  const { _id, description, isDone, title } = dynamicState;

  const toggleDone = async () => {
    const res = await axios.put(`${API_HOST}/api/publicNotes/${_id}`, {
      ...dynamicState,
      title: "AAAAAAAAAAAAAAAA",
      isDone: !isDone,
    });
    console.log({ res });
  };

  return (
    <li
      className={`w-full h-auto 
    border shadow-md
    flex
    flex-col
    gap-4
    p-4 ${isDone ? "bg-green-400" : "bg-red-400"}`}
      onClick={() => {
        toggleDone();
      }}
    >
      <div className=" pt-2 w-full flex justify-end">
        <Image
          src="x.svg"
          width={16}
          height={16}
          alt="X"
          className="cursor-pointer"
        />
      </div>
      <p className="">Title: {title}</p>
      <p>Description: {description}</p>
      <CardInteractions isDone />
    </li>
  );
};

export default PublicNoteItem;
