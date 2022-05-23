import useUpdateEffect from '../customHooks.js';
import { React, useState, useEffect } from 'react';
import { ACTIONS, settingsReducer } from '../App.js';
import Button from './Button.js';

const StatMenu = ({ state, settingsState, settingsDispatch, dispatch }) => {

    const [statsClass, setStatsClass] = useState('menu');

    useUpdateEffect(() => {
        if (state.menuName == 'Stats') {
            settingsDispatch({ type: ACTIONS.TOGGLE_MENU, payload: state.menuName });
        }
    }, [state.toggleSetting])

    useUpdateEffect(() => {
        if (settingsState.isStatsVisible) {
            setStatsClass('menu show');
        }
        else {
            setStatsClass('menu');
        }
    }, [settingsState.isStatsVisible])


    return (
        <div className={statsClass}>
            <div id='graphContainer'>
                <canvas id="guessChart"></canvas>
            </div>
            <div id='streakDiv'></div>
            <div id='winLoss'></div>
            <Button name='Stats' dispatch={dispatch} state={state} close={true} />
        </div>
    )
}

export default StatMenu
