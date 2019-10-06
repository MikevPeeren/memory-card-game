import React, { Component } from 'react';
import FlippableSquare from '../FlippableSquare';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import flippableSquaresJSON from '../../assets/easy-game.json';

interface GameState {
	flippableSquares: FlippableSquare[];
	flippedSquares: FlippableSquare[];
}

class Game extends Component<{}, GameState> {
	state: GameState = {
		flippableSquares: [],
		flippedSquares: []
	};

	constructor(props: any) {
		super(props);
		this.state = {
			flippableSquares: flippableSquaresJSON,
			flippedSquares: []
		};
	}

	handleClick = (id: number, shouldBeFlippable: boolean) => {
		// If it shouldn't be able to be flipped return.
		if (!shouldBeFlippable) return;

		this.setState((prevState: GameState) => {
			const { flippableSquares, flippedSquares } = prevState;

			// Find the specific card that matches the ID provided
			const flippableSquare: any = flippableSquares.find((flippableSquare: any) => flippableSquare.id === id);
			if (!flippableSquare) return;

			// Set the flipped property opposite as it is now.
			flippableSquare.isFlipped = !flippableSquare.isFlipped;
			this.flipCard(flippableSquare.id, flippableSquare);
			// If it is flipped push it to the flipped squares array.
			if (flippableSquare.isFlipped) {
				flippedSquares.push(flippableSquare.id);
			}

			return {
				...prevState,
				flippableSquares,
				flippedSquares
			};
		});

		// Call the handleFlippedCards method in order to check if cards are matched.
		// In a timeout because the checks are happening too fast.
		setTimeout(() => {
			this.handleFlippedCards();
		}, 1337);
	};

	handleFlippedCards = () => {
		this.setState((prevState: GameState) => {
			const { flippableSquares, flippedSquares } = prevState;

			// If the flippedsquares length is bigger than 2, reset all squares.
			if (flippedSquares.length > 2) {
				this.checkFlippableSquares(prevState);
			} else {
				// Find the two elements in the FlippedSquares array.
				const firstFlippedCard: any = flippableSquares.find(
					(flippableSquare: any) => flippableSquare.id === flippedSquares[0]
				);
				const secondFlippedCard: any = flippableSquares.find(
					(flippableSquare: any) => flippableSquare.id === flippedSquares[1]
				);

				// If there is no first or second flipped card return.
				if (!firstFlippedCard || !secondFlippedCard) return;
				if (firstFlippedCard.cardIcon === secondFlippedCard.cardIcon) {
					firstFlippedCard.hasBeenMatched = true;
					secondFlippedCard.hasBeenMatched = true;
				} else {
					this.checkFlippableSquares(prevState);
				}
			}
			// Resetting the FlippedSquare array in order to not get any conflicts.
			flippedSquares.length = 0;

			return {
				...prevState,
				flippableSquares,
				flippedSquares
			};
		});
	};

	// Function to check the flippable squares and to flip them
	checkFlippableSquares = (prevState: GameState) => {
		const { flippableSquares, flippedSquares } = prevState;
		flippedSquares.forEach((element: any) => {
			const flippableSquareFound: any = flippableSquares.find(
				(flippableSquare: any) => flippableSquare.id === element
			);

			flippableSquareFound.isFlipped = !flippableSquareFound.isFlipped;
			this.flipCard(flippableSquareFound.id, flippableSquareFound);
		});
	};

	// The flipping of the card happens here by manipulating the specific Dom Element.
	flipCard = (id: number, flippableSquare: any) => {
		// If the card somehow has been matched do nothing.
		if (flippableSquare.hasBeenMatched) return;

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

		// Foreach json object map it to a FlippableSquare and put it into the state.
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

export default Game;
