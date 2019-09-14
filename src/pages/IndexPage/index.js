import React from "react";
import FlippableSquare from "../../components/FlippableSquare";

const IndexPage = () => {
  return (
    <div className="card-container">
      <p className="info">Click the P to get started!</p>
      <FlippableSquare
        cardClassName="left"
        shouldBeFlippable
        frontText="F"
        backText="This is a Memory Card Game"
      />
      <FlippableSquare
        cardClassName="left"
        frontClassName="card-active"
        shouldBeFlippable={false}
        frontText="L"
        backText="This is a Memory Card Game"
      />
      <FlippableSquare
        shouldBeFlippable
        frontText="I"
        backText={
          <div className="instructions">
            <h2>Instructions</h2>
            <p>
              This is a timed card memory game. Click the green cards to see
              what symbol they uncover and try to find the matching symbol
              underneath the other cards.
            </p>
          </div>
        }
      />
      <FlippableSquare
        shouldBeFlippable
        frontText="P"
        backText={
          <div className="playgame">
            <a href="/new-game" className="play">
              Play
            </a>
          </div>
        }
      />
    </div>
  );
};

export default IndexPage;
