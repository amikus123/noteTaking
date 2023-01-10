import React from "react";
import { PublicNote } from "../../../pages/publicNotes";
import { ChangeToastData } from "../../../pages/_app";
import PublicNoteItem from "./PublicNoteItem";

interface PublicNotesListProps {
  publicNotes: PublicNote[] | null;
  changeToastData: ChangeToastData;
}
const PublicNotesList = ({
  publicNotes,
  changeToastData,
}: PublicNotesListProps) => {
  return (
    <div>
      {publicNotes === null ? (
        <p></p>
      ) : (
        <ul className="gap-4 flex flex-col w-80">
          {publicNotes.map((item, index) => {
            return (
              <PublicNoteItem
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
