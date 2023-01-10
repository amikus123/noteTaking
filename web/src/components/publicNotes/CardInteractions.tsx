import React from "react";
import CardToggle from "./CardToggle";

interface CardInteractionsProps {
  isDone: boolean;
  toggleDone: () => Promise<void>;
}
const CardInteractions = ({ isDone, toggleDone }: CardInteractionsProps) => {
  return (
    <>
      <p>Edit card</p>
      <CardToggle isDone={isDone} toggleDone={toggleDone} />
    </>
  );
};

export default CardInteractions;
