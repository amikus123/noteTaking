import React from "react";
import CardToggle from "./CardToggle";

interface CardInteractionsProps {
  isDone: boolean;
  toggleDone: () => Promise<void>;
}
const CardInteractions = ({ isDone, toggleDone }: CardInteractionsProps) => {
  return <></>;
};

export default CardInteractions;
