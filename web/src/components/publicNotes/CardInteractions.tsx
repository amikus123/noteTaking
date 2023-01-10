import React from "react";
import CardToggle from "./CardToggle";

interface CardInteractionsProps {
  isDone: boolean;
}
const CardInteractions = ({ isDone }: CardInteractionsProps) => {
  return (
    <>
      <p>Edit card</p>
      <CardToggle isDone={isDone} />
    </>
  );
};

export default CardInteractions;
