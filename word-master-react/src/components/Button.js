import React from 'react';
import { ACTIONS, reducer } from '../App.js';


const Button = ({ name, dispatch, state, close }) => {

    let buttonText = name;

    if (close) {
        buttonText = 'Close';
    }

    const handleClick = () => {
        if (name == 'New Word') {
            dispatch({ type: ACTIONS.NEWGAME });
        }
        else {
            dispatch({ type: ACTIONS.MENU, payload: name });
        }
    }

    return (
        <button className="button" onClick={handleClick}>
            {buttonText}
        </button>
    )
}

export default Button
