import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import classnames from 'classnames';

interface FlippableSquareProps {
    cardClassName: string | null;
    frontText: string | null;
    backText: string | {} | null;
    shouldBeFlippable: boolean;
    frontClassName: string | null;
    isGameCard: boolean;
    cardIcon: IconProp | undefined;
}

interface FlippableSquareState {
    isFlipped: boolean;
    isGameCard: boolean;
}

class FlippableSquare extends Component<FlippableSquareProps, FlippableSquareState> {
    static defaultProps: Readonly<FlippableSquareProps> = {
        cardClassName: null,
        frontText: null,
        backText: null,
        shouldBeFlippable: true,
        frontClassName: null,
        isGameCard: false,
        cardIcon: undefined,
    };

    state: Readonly<FlippableSquareState> = {
        isFlipped: false,
        isGameCard: false,
    };

    private cardComponent: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<FlippableSquareProps>) {
        super(props);
        this.cardComponent = React.createRef<HTMLDivElement>();
    }

    handleClick = () => {
        const { shouldBeFlippable } = this.props;
        const cardComponent = this.cardComponent.current!;

        if (!shouldBeFlippable) return;

        if (cardComponent) {
            if (cardComponent.classList.contains('flipped')) {
                cardComponent.classList.remove('flipped');
            } else {
                cardComponent.classList.add('flipped');
            }
        }

        this.setState((prevState: Readonly<FlippableSquareState>) => ({
            isFlipped: !prevState.isFlipped,
            isGameCard: this.props.isGameCard || false,
        }));
    };

    render() {
        let renderblock;
        if (!this.state.isGameCard) {
            if (this.state.isFlipped) {
                renderblock = <div className="card-text back card-active">{this.props.backText}</div>;
            } else {
                const classes = classnames('card-text front', this.props.frontClassName);
                renderblock = <div className={classes}>{this.props.frontText}</div>;
            }
        } else {
            if (this.state.isFlipped) {
                if (this.props.cardIcon) {
                    renderblock = (
                        <div className="card-div">
                            <FontAwesomeIcon className="card-icon" icon={this.props.cardIcon} />
                        </div>
                    );
                }
            }
        }

        return (
            <div ref={this.cardComponent} onClick={this.handleClick} className={classnames(this.props.cardClassName)}>
                {renderblock}
            </div>
        );
    }
}

export default FlippableSquare;
