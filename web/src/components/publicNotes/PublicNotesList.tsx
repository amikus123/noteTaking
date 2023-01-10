import React from "react";
import { PublicNote } from "../../../pages/publicNotes";
import { ChangeToastData } from "../../../pages/_app";
import PublicNoteItem from "./PublicNoteItem";

interface PublicNotesListProps {
  publicNotes: PublicNote[] | undefined;
  changeToastData: ChangeToastData;
  removeNote: (id: string) => void;
}
const PublicNotesList = ({
  publicNotes,
  changeToastData,
  removeNote,
}: PublicNotesListProps) => {
  return (
    <div>
      {publicNotes === undefined ? (
        <p></p>
      ) : (
        <ul className="gap-4 flex flex-col w-80">
          {publicNotes.map((item, index) => {
            return (
              <PublicNoteItem
                removeNote={removeNote}
                key={index}
                publicNote={item}
                changeToastData={changeToastData}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PublicNotesList;
