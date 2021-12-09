import React, { ReactChild } from "react";
import "../scss/Board.scss";

const Board: React.FC<TProps> = ({ children }) => {
  return (
      <div className="board">{children}</div>
  );
};

export default Board;

// TYPES

type TProps = {
  children: ReactChild;
};
