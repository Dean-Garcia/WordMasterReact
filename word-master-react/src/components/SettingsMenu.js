import React from 'react'
import useUpdateEffect from '../customHooks.js';
import { useState, useEffect } from 'react';
import { ACTIONS, settingsReducer, reducer } from '../App.js';
import Button from './Button.js';
import Slider from './Slider.js';



const SettingsMenu = ({ state, settingsState, settingsDispatch, dispatch }) => {

    const [settingsClass, setSettingsClass] = useState('menu');

    useUpdateEffect(() => {
        if (state.menuName == 'Settings') {
            settingsDispatch({ type: ACTIONS.TOGGLE_MENU, payload: state.menuName });
        }
    }, [state.toggleSetting])

    useUpdateEffect(() => {
        if (settingsState.isSettingsVisible) {
            setSettingsClass('menu show');
        }
        else if (!settingsState.isSettingsVisible) {
            setSettingsClass('menu');
        }
    }, [settingsState.isSettingsVisible])

    return (
        <div className={settingsClass}>
            <h3>Settings</h3>
            <Slider name="Endurance mode" settingsDispatch={settingsDispatch} />
            <Slider name="Hard mode" settingsDispatch={settingsDispatch} />
            <Slider name="Color Blind Mode" settingsDispatch={settingsDispatch} />
            <label>Theme <select name="Theme" id="theme">
                <option value="Dark">Dark (Default)</option>
                <option value="Wordle">Light (Wordle)</option>
                <option value="Darker">Darker (Darker)</option>
            </select></label>
            <Button name='Settings' dispatch={dispatch} state={state} close={true} />
        </div>
    )
}

export default SettingsMenu;
