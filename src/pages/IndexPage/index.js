import React from "react";
import FlippableSquare from "../../components/FlippableSquare";

const IndexPage = () => {
  return (
    <div className="logo logo-container">
      <FlippableSquare
        cardClassName="card left"
        frontClassName="front-card-text"
        shouldBeFlippable
        frontText="F"
        backText="This is a Memory Card Game"
      />
      <FlippableSquare
        cardClassName="card left"
        frontClassName="front-card-text card-active"
        shouldBeFlippable={false}
        frontText="L"
        backText="This is a Memory Card Game"
      />
      <FlippableSquare
        cardClassName="card"
        frontClassName="front-card-text"
        shouldBeFlippable
        frontText="I"
        backText="This is a timed card memory game. Click the green cards to see what symbol they uncover and try to find the matching symbol underneath the other cards."
      />
      <FlippableSquare
        cardClassName="card"
        frontClassName="front-card-text"
        shouldBeFlippable
        frontText="P"
        backText="This is a Memory Card Game"
      />
    </div>
  );
};

export default IndexPage;
