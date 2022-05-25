import React from 'react'
import { ACTIONS } from '../App';

const Slider = ({ name, settingsDispatch }) => {

    const handleClick = () => {
        let actionType = '';
        switch (name) { // Toggle each setting
            case "Endurance Mode":
                actionType = ACTIONS.TOGGLE_ENDURANCE_MODE;
                break;
            case "Hard Mode":
                actionType = ACTIONS.TOGGLE_HARDMODE;
                break;
            case "Color Blind Mode":
                actionType = ACTIONS.TOGGLE_COLOR_BLIND_MODE;
                break;
        }
        settingsDispatch({ type: actionType });
    }

    return (
        <div >
            {name} < label className="switch" >
                <input onClick={handleClick} type="checkbox" />
                <span className="slider round"></span>
            </label >
        </div>
    )
}

export default Slider
