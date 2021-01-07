/* eslint-disable @typescript-eslint/ban-types */
// React
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line no-unused-vars
import { IconName } from '@fortawesome/fontawesome-svg-core';

import classnames from 'classnames';

interface FlippableSquareState {
  id: number | null;
  isFlipped: boolean;
}
interface FlippableSquareProps {
  id: number | null;
  cardClassName: string | null;
  frontText: string | null;
  backText: string | any | null;
  shouldBeFlippable: boolean;
  frontClassName: string | null;
  isGameCard: boolean;
  cardIcon: IconName | undefined;
  checkFlippedCards: Function | undefined;
  handleClick: Function | undefined;
  isFlipped: boolean;
  hasBeenMatched: boolean;
}

class FlippableSquare extends Component<FlippableSquareProps, FlippableSquareState> {
  state: FlippableSquareState = {
    id: null,
    isFlipped: false,
  };

  static defaultProps: FlippableSquareProps = {
    id: null,
    cardClassName: null,
    frontText: null,
    backText: null,
    shouldBeFlippable: true,
    frontClassName: null,
    isGameCard: false,
    cardIcon: undefined,
    checkFlippedCards: undefined,
    handleClick: undefined,
    isFlipped: false,
    hasBeenMatched: false,
  };

  handleClick = (): void => {
    if (this.props.hasBeenMatched) return;

    if (this.props.handleClick) {
      this.props.handleClick(this.props.id, this.props.shouldBeFlippable);
    } else {
      // Kinda want to do this another way but could not figure out how in an elegant way :(
      if (!this.props.shouldBeFlippable) return;

      // Set the flipped state.
      this.setState((prevState: FlippableSquareState) => {
        prevState.isFlipped = !prevState.isFlipped;
        return {
          ...prevState,
        };
      });

      const DOMElement = document.getElementById(String(this.props.id));

      if (DOMElement) {
        if (DOMElement.classList.contains('flipped')) {
          DOMElement.classList.remove('flipped');
        } else {
          DOMElement.classList.add('flipped');
        }
      }
    }
  };

  render(): JSX.Element {
    let renderblock;
    if (!this.props.isGameCard) {
      if (this.state.isFlipped) {
        renderblock = <div className="card-text back card-active">{this.props.backText}</div>;
      } else {
        const classes = classnames('card-text front', this.props.frontClassName);
        renderblock = <div className={classes}>{this.props.frontText}</div>;
      }
    } else {
      if (this.props.isFlipped) {
        if (this.props.cardIcon) {
          renderblock = (
            <div className="card-div">
              <FontAwesomeIcon className={classnames('card-icon')} icon={this.props.cardIcon} />
            </div>
          );
        }
      }
    }

    return (
      <div id={String(this.props.id)} onClick={this.handleClick} className={classnames(this.props.cardClassName)}>
        {renderblock}
      </div>
    );
  }
}

export default FlippableSquare;
