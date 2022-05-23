import React from 'react'
import Button from './Button'

const Buttons = ({ dispatch, state }) => {



    return (
        <div className='buttonContainer'>
            <Button name='New Word' dispatch={dispatch} state={state} />
            <Button name='Seed' dispatch={dispatch} state={state} />
            <Button name='Stats' dispatch={dispatch} state={state} />
            <Button name='Settings' dispatch={dispatch} state={state} />
        </div>
    )
}

export default Buttons
