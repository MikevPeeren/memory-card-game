import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';

import { IconName } from '@fortawesome/free-solid-svg-icons';

import FlippableSquare from '../FlippableSquare';

import flippableSquaresJSON from '../../assets/easy-game.json';

interface GameState {
	flippableSquares: FlippableSquare[];
	flippedSquares: FlippableSquare[];
	progressBarValue: number;
}

class Game extends Component<{}, GameState> {
	state: GameState = {
		flippableSquares: [],
		flippedSquares: [],
		progressBarValue: 0,
	};

	constructor(props: {}) {
		super(props);
		this.state = {
			//@ts-ignore
			flippableSquares: flippableSquaresJSON,
			flippedSquares: [],
			progressBarValue: 0,
		};
	}

	// If the component is mounted update the progressbart
	componentDidMount() {
		setInterval(() => this.updateProgressBar(), 1000);
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
				flippedSquares,
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
					(flippableSquare: any) => flippableSquare.id === flippedSquares[0],
				);
				const secondFlippedCard: any = flippableSquares.find(
					(flippableSquare: any) => flippableSquare.id === flippedSquares[1],
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
				flippedSquares,
			};
		});
	};

	// Function to check the flippable squares and to flip them
	checkFlippableSquares = (prevState: GameState) => {
		const { flippableSquares, flippedSquares } = prevState;
		flippedSquares.forEach((element: any) => {
			const flippableSquareFound: any = flippableSquares.find(
				(flippableSquare: any) => flippableSquare.id === element,
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

	// Updating the progressbar with 5% each time.
	updateProgressBar() {
		this.setState((prevState: GameState) => {
			let { progressBarValue } = prevState;

			if (progressBarValue >= 100) {
				const DOMElement = document.getElementById('game-over');
				if (DOMElement) {
					DOMElement.classList.remove('game-over-display');
				}
				prevState.flippableSquares = [];
			} else {
				progressBarValue = prevState.progressBarValue + 5;
			}

			return {
				progressBarValue,
			};
		});
	}

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
				shouldBeFlippable
				isGameCard
				isFlipped={flippableSquare.isFlipped}
				handleClick={this.handleClick}
				hasBeenMatched={flippableSquare.hasBeenMatched}
			/>
		));

		return (
			<div className="card-container-new-game">
				<Alert id="game-over" className="game-over game-over-display" variant="danger">
					<Alert.Heading>Game Over</Alert.Heading>
					<p className="mb-0">
						<br />
						You did not complete the game within the given time period. Please try again, by refreshing. :)
					</p>
				</Alert>
				<ProgressBar className="progressbar" variant="warning" now={this.state.progressBarValue} />
				{flippableSquares}
			</div>
		);
	}
}

export default Game;
