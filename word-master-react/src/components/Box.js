import { useState, useEffect } from 'react';
import React from 'react';
import { ACTIONS, reducer } from '../App.js';
import useUpdateEffect from '../customHooks.js';


const Box = ({ board, line, box, boxNum, dispatch, state, word }) => {
    let className = 'box';

    const [boxClass, setBoxClass] = useState('box');


    const changeClass = () => {
        if (line === state.currentLine && state.animation) {
            if (board[line][box] === word[box]) {
                className = 'box flipLetter correct';
            }
            else if (word.includes(board[line][box])) {
                className = 'box flipLetter present';
            }
            else {
                className = 'box flipLetter wrong';
            }
            if (box === boxNum - 1) {
                dispatch({ type: ACTIONS.NEXT_BOX, payload: true });
            }
            setTimeout(() => { setBoxClass(className) }, box * 100);
        }
    }

    useUpdateEffect(() => {
        setTimeout(() => { changeClass() }, box * 100)
    }, [state.animation])

    useUpdateEffect(() => {
        if (boxClass === 'box') {
            className = 'box letterPop';
        }
        else {
            className = 'box';
        }
        setBoxClass(className);
    }, [board[line][box]])

    return (
        <div className={boxClass} >
            {board[line][box]}
        </div >
    )
}

export default Box
