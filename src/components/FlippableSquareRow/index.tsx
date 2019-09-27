import React, { Component } from 'react';
import FlippableSquare from '../FlippableSquare';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import flippableSquaresJSON from '../../utils/easy-game.json';

interface FlippableSquareRowState {
    flippableSquares: FlippableSquare[] | undefined;
}

class FlippableSquareRow extends Component<{}, FlippableSquareRowState> {
    state: FlippableSquareRowState = {
        flippableSquares: undefined,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            flippableSquares: flippableSquaresJSON,
        };
    }

    // In order to process a Click event on a Square
    handleClick = (id: number, shouldBeFlippable: boolean) => {
        if (!shouldBeFlippable) return;

        if (!this.state.flippableSquares) {
            return;
        }

        this.setState((prevState: any | undefined) => {
            const cloneState = prevState.flippableSquares;

            if (!cloneState) {
                return;
            }

            const flippableSquare = cloneState.find((flippableSquare: any) => flippableSquare.id === id);

            flippableSquare.isFlipped = !flippableSquare.isFlipped;

            const DOMElement = document.getElementById(String(flippableSquare.id));

            // Setting up the transformation.
            if (DOMElement) {
                if (DOMElement.classList.contains('flipped')) {
                    DOMElement.classList.remove('flipped');
                } else {
                    DOMElement.classList.add('flipped');
                }
            }

            return {
                ...prevState,
                flippableSquare,
            };
        });
    };

    checkFlippedCards = () => {
        //
    };

    render() {
        if (!this.state.flippableSquares) {
            return;
        }

        const flippableSquares = this.state.flippableSquares.map((flippableSquare: any) => (
            <FlippableSquare
                key={flippableSquare.id}
                id={flippableSquare.id}
                cardClassName="card-new-game"
                cardIcon={flippableSquare.cardIcon as IconName}
                shouldBeFlippable={true}
                isGameCard={true}
                isFlipped={flippableSquare.isFlipped}
                handleClick={this.handleClick}
                checkFlippedCards={this.checkFlippedCards}
            />
        ));

        return <div className="card-container-new-game">{flippableSquares}</div>;
    }
}

export default FlippableSquareRow;
