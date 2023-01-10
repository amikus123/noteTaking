import React from "react";
import { PublicNote } from "../../../pages/publicNotes";
import PublicNoteItem from "./PublicNoteItem";

interface PublicNotesListProps {
  publicNotes: PublicNote[] | null;
}
const PublicNotesList = ({ publicNotes }: PublicNotesListProps) => {
  return (
    <div>
      {publicNotes === null ? (
        <p></p>
      ) : (
        <ul className="gap-4 flex flex-col w-80">
          {publicNotes.map((item, index) => {
            return <PublicNoteItem key={index} publicNote={item} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default PublicNotesList;
