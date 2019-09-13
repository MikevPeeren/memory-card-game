import React, { Component } from "react";

class FlippableSquare extends Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleClick = () => {
    const { shouldBeFlippable } = this.props;

    if (!shouldBeFlippable) return;

    this.setState(prevState => ({
      isFlipped: !prevState.isFlipped
    }));
  };

  render() {
    return (
      <div onClick={this.handleClick} className={this.props.cardClassName}>
        <div className="flipper">
          {!this.state.isFlipped ? (
            <div className={this.props.frontClassName}>
              {this.props.frontText}
            </div>
          ) : (
            <div className="back back-card-text">{this.props.backText}</div>
          )}
        </div>
      </div>
    );
  }
}

export default FlippableSquare;
