import React, { Component } from 'react';

import classnames from 'classnames';

interface FlippableSquareProps {
    cardClassName: string | null;
    frontText: string | null;
    backText: string | {} | null;
    shouldBeFlippable: boolean;
    frontClassName: string | null;
    isGameCard: boolean;
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

        if (!shouldBeFlippable) return;
        if (this.cardComponent) {
            this.cardComponent.current!.toggleAttribute('flipped');
        }

        this.setState((prevState: Readonly<FlippableSquareState>) => ({
            isFlipped: !prevState.isFlipped,
            isGameCard: this.props.isGameCard || false,
        }));
    };

    render() {
        console.log(this.state.isFlipped);
        return (
            <div ref={this.cardComponent} onClick={this.handleClick} className={classnames(this.props.cardClassName)}>
                {!this.state.isGameCard ? ( // If it is not a GameCard it should consists of these CSS Classes and should be able to contain Text
                    !this.state.isFlipped ? (
                        <div className={classnames('card-text front', this.props.frontClassName)}>
                            {this.props.frontText}
                        </div>
                    ) : (
                        <div className="card-text back card-active">{this.props.backText}</div>
                    )
                ) : // If it IS a GameCard it should be a plain block and the back card should contain a Logo to match upon.
                this.state.isFlipped ? (
                    // ToDo: should contain a Logo to match both Logo's
                    <div className="" />
                ) : null}
            </div>
        );
    }
}

export default FlippableSquare;
