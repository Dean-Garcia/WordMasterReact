import useUpdateEffect from '../customHooks.js';
import { React, useState, useEffect } from 'react';
import { ACTIONS, settingsReducer } from '../App.js';
import Button from './Button.js';

const SeedMenu = ({ state, settingsState, settingsDispatch, dispatch }) => {

    const [seedClass, setSeedClass] = useState('menu');

    useUpdateEffect(() => {
        if (state.menuName == 'Seed') {
            settingsDispatch({ type: ACTIONS.TOGGLE_MENU, payload: state.menuName });
        }
    }, [state.toggleSetting])

    useUpdateEffect(() => {
        if (settingsState.isSeedVisible) {
            setSeedClass('menu show');
        }
        else {
            setSeedClass('menu');
        }
    }, [settingsState.isSeedVisible])

    return (
        <div className={seedClass}>
            <form id='seedForm'>
                <div id='currentSeed'>Current Seed:
                    <div id='currentSeedMessage'></div>
                </div>
                <label>Enter Seed <input id='seedInput' maxLength='8' minLength='8' type='number'></input></label>
            </form>
            <Button name='Seed' dispatch={dispatch} state={state} close={true} />
        </div>
    )
}

export default SeedMenu;
