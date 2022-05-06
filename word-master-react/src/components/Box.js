import { useState, useEffect } from 'react';
import React from 'react';


const Box = ({ board, line, box, value, currentLineValue, currentBoxValue }) => {
    const [boxValue, setBoxValue] = useState(value);

    const handleClick = () => {
        currentLineValue(line);
        currentBoxValue(box);
        console.log(`line ${line} box ${box}`)
    };

    return (
        <div tabIndex="0" onClick={handleClick}
            className='box'>
            {board[line][box]}
        </div>
    )
}

export default Box
