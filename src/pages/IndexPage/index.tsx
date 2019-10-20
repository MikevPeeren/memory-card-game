import React from 'react';
import '../../styles/index.css';
import FlippableSquare from '../../components/FlippableSquare';

const IndexPage = (): JSX.Element => {
	return (
		<div className="card-container">
			<p className="info">Click the P to get started!</p>
			<FlippableSquare
				key={1}
				id={1}
				cardClassName="card left"
				shouldBeFlippable
				isFlipped={false}
				frontText="F"
				backText="A Memory Card Game"
			/>
			<FlippableSquare
				key={2}
				id={2}
				cardClassName="card left"
				frontClassName="card-active"
				shouldBeFlippable={false}
				isFlipped={false}
				frontText="L"
				backText="This is a Memory Card Game"
			/>
			<FlippableSquare
				key={3}
				id={3}
				cardClassName="card"
				shouldBeFlippable
				isFlipped={false}
				frontText="I"
				backText={
					<div className="instructions">
						<h2>Instructions</h2>
						<p>
							This is a timed card memory game. Click the green cards to see what symbol they uncover and
							try to find the matching symbol underneath the other cards.
						</p>
					</div>
				}
			/>
			<FlippableSquare
				key={4}
				id={4}
				cardClassName="card"
				shouldBeFlippable
				isFlipped={false}
				frontText="P"
				backText={
					<div className="playgame">
						<a href="/new-game" className="play">
							Play
						</a>
					</div>
				}
			/>
		</div>
	);
};

export default IndexPage;
