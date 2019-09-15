import React, { Component } from "react";
import FlippableSquare from "../../components/FlippableSquare";

class FlippableSquareRow extends Component {
  constructor(props) {
    super(props);
    this.state = { isGameCard: true };
  }

  render() {
    const flippableRows = [];
    for (let i = 0; i < this.props.FlippableSquares; i++) {
      flippableRows.push(
        <FlippableSquare
          cardClassName="card-new-game"
          shouldBeFlippable
          isGameCard={this.state.isGameCard}
        />
      );
    }
    return <div className="card-container-new-game">{flippableRows}</div>;
  }
}

export default FlippableSquareRow;
