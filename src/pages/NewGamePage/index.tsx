import React from 'react';
import '../../styles/newgame.css';
import FlippableSquareRow from '../../components/FlippableSquareRow';

const NewGamePage = () => {
    return <FlippableSquareRow flippableSquares={16} />;
};

export default NewGamePage;
