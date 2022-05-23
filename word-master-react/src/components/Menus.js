import React from 'react';
import SeedMenu from './SeedMenu';
import SettingsMenu from './SettingsMenu';
import StatMenu from './StatMenu';
import { useState, useEffect } from 'react';
import useUpdateEffect from '../customHooks';

const Menus = ({ state, settingsState, settingsDispatch, dispatch }) => {

    const [menuContainerClass, setMenuContainerClass] = useState('menuContainer');

    useUpdateEffect(() => {
        if (settingsState.isSettingsVisible === true || settingsState.isSeedVisible === true || settingsState.isStatsVisible === true) {
            setMenuContainerClass(() => 'menuContainer show');
        }
        else {
            setMenuContainerClass(() => 'menuContainer');
        }
    }, [settingsState.isSettingsVisible, settingsState.isSeedVisible, settingsState.isStatsVisible])

    return (
        <div className={menuContainerClass}>
            <SeedMenu state={state} settingsState={settingsState} settingsDispatch={settingsDispatch} dispatch={dispatch} />
            <SettingsMenu state={state} settingsState={settingsState} settingsDispatch={settingsDispatch} dispatch={dispatch} />
            <StatMenu state={state} settingsState={settingsState} settingsDispatch={settingsDispatch} dispatch={dispatch} />
        </div >
    )
}

export default Menus;
