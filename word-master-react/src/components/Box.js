import { useState, useEffect } from 'react';
import React from 'react';


const Box = ({ board, line, box, value }) => {
    const [boxValue, setBoxValue] = useState(value);
    const [boxClass, setBoxClass] = useState('box');

    const handleClick = () => {
        //handle click firing??
    };

    const changeClass = () => {
        console.log('hello');
    }

    return (
        <div tabIndex="0" onClick={handleClick}
            className={boxClass} >
            {board[line][box]}
        </div >
    )
}

export default Box
