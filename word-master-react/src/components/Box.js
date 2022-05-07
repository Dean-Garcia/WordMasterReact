import { useState, useEffect } from 'react';
import React from 'react';


const Box = ({ board, line, box, value }) => {
    const [boxValue, setBoxValue] = useState(value);

    const handleClick = () => {
        //handle click firing??
    };

    return (
        <div tabIndex="0" onClick={handleClick}
            className='box'>
            {board[line][box]}
        </div>
    )
}

export default Box
