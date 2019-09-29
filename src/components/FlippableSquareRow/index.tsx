import React, { Component } from 'react';
import FlippableSquare from '../FlippableSquare';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import flippableSquaresJSON from '../../assets/easy-game.json';

interface FlippableSquareRowState {
    flippableSquares: FlippableSquare[];
    flippedSquares: FlippableSquare[];
}

class FlippableSquareRow extends Component<{}, FlippableSquareRowState> {
    state: FlippableSquareRowState = {
        flippableSquares: [],
        flippedSquares: [],
    };

    constructor(props: any) {
        super(props);
        this.state = {
            flippableSquares: flippableSquaresJSON,
            flippedSquares: [],
        };
    }

    // The Handle Click of a card.
    handleClick = (id: number, shouldBeFlippable: boolean) => {
        // If it shouldn't be able to be flipped return.
        if (!shouldBeFlippable) return;

        this.setState((prevState: FlippableSquareRowState) => {
            const { flippableSquares, flippedSquares } = prevState;

            // Find the specific card that matches the ID provided
            const flippableSquare: any = flippableSquares.find((flippableSquare: any) => flippableSquare.id === id);
            if (!flippableSquare) return;

            console.log(flippableSquare);

            // Set the flipped property opposite as it is now.
            flippableSquare.isFlipped = !flippableSquare.isFlipped;
            this.flipCard(flippableSquare.id);

            // If it is flipped push it to the flipped squares array.
            if (flippableSquare.isFlipped) {
                flippedSquares.push(flippableSquare.id);
            }

            return {
                ...prevState,
                flippableSquares,
                flippedSquares,
            };
        });

        // Call the handleFlippedCards method in order to check if cards are matched.

        setTimeout(() => {
            this.handleFlippedCards();
        }, 1337);
    };

    handleFlippedCards = () => {
        this.setState((prevState: FlippableSquareRowState) => {
            const { flippableSquares, flippedSquares } = prevState;

            const firstFlippedCard: any = flippableSquares.find(
                (flippableSquare: any) => flippableSquare.id === flippedSquares[0],
            );
            const secondFlippedCard: any = flippableSquares.find(
                (flippableSquare: any) => flippableSquare.id === flippedSquares[1],
            );

            if (!firstFlippedCard || !secondFlippedCard) return;
            if (firstFlippedCard.cardIcon === secondFlippedCard.cardIcon) {
                firstFlippedCard.hasBeenMatched = true;
                secondFlippedCard.hasBeenMatched = true;
            } else {
                flippedSquares.forEach((element: any) => {
                    const flippableSquareFound: any = flippableSquares.find(
                        (flippableSquare: any) => flippableSquare.id === element,
                    );

                    flippableSquareFound.isFlipped = !flippableSquareFound.isFlipped;
                    this.flipCard(flippableSquareFound.id);
                });
            }

            flippedSquares.length = 0;

            return {
                ...prevState,
                flippableSquares,
                flippedSquares,
            };
        });
    };

    // Function so the card can get flipped over
    flipCard = (id: number) => {
        // Making sure the card gets their correct css transformation.
        const DOMElement = document.getElementById(String(id));

        if (DOMElement) {
            if (DOMElement.classList.contains('flipped')) {
                DOMElement.classList.remove('flipped');
            } else {
                DOMElement.classList.add('flipped');
            }
        }
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
                hasBeenMatched={flippableSquare.hasBeenMatched}
            />
        ));

        return <div className="card-container-new-game">{flippableSquares}</div>;
    }
}

export default FlippableSquareRow;
