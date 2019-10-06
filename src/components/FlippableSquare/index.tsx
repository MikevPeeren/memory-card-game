import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import classnames from 'classnames';

interface FlippableSquareProps {
	id: number | null;
	cardClassName: string | null;
	frontText: string | null;
	backText: string | {} | null;
	shouldBeFlippable: boolean;
	frontClassName: string | null;
	isGameCard: boolean;
	cardIcon: IconName | undefined;
	checkFlippedCards: Function | undefined;
	handleClick: any;
	isFlipped: boolean;
	hasBeenMatched: boolean;
}

class FlippableSquare extends Component<FlippableSquareProps> {
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
		hasBeenMatched: false
	};

	handleClick = () => {
		if (this.props.hasBeenMatched) return;

		if (this.props.handleClick) {
			this.props.handleClick(this.props.id, this.props.shouldBeFlippable);
		}
	};

	render() {
		let renderblock;
		if (!this.props.isGameCard) {
			if (this.props.isFlipped) {
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
