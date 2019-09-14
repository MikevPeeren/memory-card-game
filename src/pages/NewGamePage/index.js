import React from "react";
import FlippableSquare from "../../components/FlippableSquare";

const NewGamePage = () => {
  return (
    <div className="card-container">
       <FlippableSquare
        cardClassName="left"
        shouldBeFlippable
        frontText=""
        backText="A Card Icon"
      />
    </div>
  );
};

export default NewGamePage;
