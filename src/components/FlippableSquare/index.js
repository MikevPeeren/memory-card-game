import React, { Component } from "react";
const classnames = require("classnames");

class FlippableSquare extends Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleClick = () => {
    const { shouldBeFlippable } = this.props;

    if (!shouldBeFlippable) return;
    if (this.refs.cardComponent) {
      this.refs.cardComponent.classList.toggle("flipped");
    }

    this.setState(prevState => ({
      isFlipped: !prevState.isFlipped
    }));
  };

  render() {
    return (
      <div
        ref="cardComponent"
        onClick={this.handleClick}
        className={classnames("card", this.props.cardClassName)}
      >
        {!this.state.isFlipped ? (
          <div
            className={classnames("card-text front", this.props.frontClassName)}
          >
            {this.props.frontText}
          </div>
        ) : (
          <div className="card-text back card-active">
            {this.props.backText}
          </div>
        )}
      </div>
    );
  }
}

export default FlippableSquare;
