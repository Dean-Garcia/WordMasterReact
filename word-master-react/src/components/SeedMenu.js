import useUpdateEffect from '../customHooks.js';
import { React, useState, useEffect } from 'react';
import { ACTIONS, settingsReducer } from '../App.js';
import Button from './Button.js';

const SeedMenu = ({ state, settingsState, settingsDispatch, dispatch }) => {

    const [seedClass, setSeedClass] = useState('menu');



    const handleSubmit = (e) => {
        let inputSeed = e.target[0].value;
        e.preventDefault();
        settingsDispatch({ type: ACTIONS.SET_INPUT_SEED, payload: inputSeed })
        settingsDispatch({ type: ACTIONS.TOGGLE_MENU, payload: state.menuName });
    }

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
            <form onSubmit={handleSubmit}>
                <div>Current Seed:<br />
                    {state.seed}
                </div>
                <label>Enter Seed <input id='seedInput' maxLength='8' minLength='8' type='number'></input></label>
            </form>
            <Button name='Seed' dispatch={dispatch} state={state} close={true} />
        </div>
    )
}

export default SeedMenu;
