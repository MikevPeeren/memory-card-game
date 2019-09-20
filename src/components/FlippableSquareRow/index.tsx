import React, { Component } from 'react';
import FlippableSquare from '../FlippableSquare';

interface FlippableSquareRowProps {
    flippableSquares: number | null;
}

class FlippableSquareRow extends Component<FlippableSquareRowProps> {
    static defaultProps: FlippableSquareRowProps = {
        flippableSquares: null,
    };

    render() {
        const flippableRows = [];
        for (let i = 0; i < this.props.flippableSquares!; i++) {
            flippableRows.push(
                <FlippableSquare key={i} cardClassName="card-new-game" shouldBeFlippable={true} isGameCard={true} />,
            );
        }
        return <div className="card-container-new-game">{flippableRows}</div>;
    }
}

export default FlippableSquareRow;
