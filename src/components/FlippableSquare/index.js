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
        className={classnames(this.props.cardClassName)}
      >
        {!this.props.isGameCard ? 
        // If it is not a GameCard it should consists of these CSS Classes and should be able to contain Text
        (
          !this.state.isFlipped ? 
          (
            <div className={classnames("card-text front", this.props.frontClassName)}>
              {this.props.frontText}
            </div>
          ) 
          : 
          (
            <div className="card-text back card-active">
              {this.props.backText}
            </div>
          )
        ) 
        : 
        // If it IS a GameCard it should be a plain block and the back card should contain a Logo to match upon.
        !this.state.isFlipped ? 
        (
          // ToDo: should contain nothing
          <div className=""></div>
        ) 
        : 
        (
          // ToDo: should contain a Logo to match both Logo's
          <div className=""></div>
        )}
      </div>
    );
  }
}

export default FlippableSquare;
