import React, { Component } from 'react';
import FlippableSquare from '../FlippableSquare';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    IconName,
    faCoffee,
    faAirFreshener,
    faBaby,
    faAmbulance,
    faCoins,
    faCarrot,
    faCreditCard,
    faCookie,
} from '@fortawesome/free-solid-svg-icons';

interface FlippableSquareRowProps {
    flippableSquares: number | null;
}

interface FlippableSquareRowState {
    iconArray: IconName[];
}

class FlippableSquareRow extends Component<FlippableSquareRowProps> {
    static defaultProps: FlippableSquareRowProps = {
        flippableSquares: null,
    };

    state: Readonly<FlippableSquareRowState> = {
        // For now this array with duplicated data untill i find a better solution.
        iconArray: [
            'coffee',
            'air-freshener',
            'baby',
            'ambulance',
            'coins',
            'carrot',
            'credit-card',
            'cookie',
            'coffee',
            'air-freshener',
            'baby',
            'ambulance',
            'coins',
            'carrot',
            'credit-card',
            'cookie',
        ],
    };

    constructor(props: Readonly<FlippableSquareRowProps>) {
        super(props);
        library.add(faCoffee);
        library.add(faAirFreshener);
        library.add(faBaby);
        library.add(faAmbulance);
        library.add(faCoins);
        library.add(faCarrot);
        library.add(faCreditCard);
        library.add(faCookie);
    }

    getIcon = () => {
        if (this.props.flippableSquares) {
            if (this.state.iconArray) {
                const selectedIndex = Math.floor(Math.random() * this.state.iconArray.length);
                const selectedIcon = this.state.iconArray[selectedIndex];

                this.state.iconArray.splice(selectedIndex, 1);

                return selectedIcon;
            }
        }
    };

    render() {
        const flippableRows = [];
        for (let i = 0; i < this.props.flippableSquares!; i++) {
            flippableRows.push(
                <FlippableSquare
                    key={i}
                    cardClassName="card-new-game"
                    cardIcon={this.getIcon()}
                    shouldBeFlippable={true}
                    isGameCard={true}
                />,
            );
        }
        return <div className="card-container-new-game">{flippableRows}</div>;
    }
}

export default FlippableSquareRow;
