import React from "react";
import "../../styles/newgame.css";
import FlippableSquareRow from "../../components/FlippableSquareRow";

const NewGamePage = () => {
  return <FlippableSquareRow FlippableSquares={16} />;
};

export default NewGamePage;
