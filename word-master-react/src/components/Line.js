import Box from './Box'
import { useState } from 'react';
import useUpdateEffect from '../customHooks';
import { ACTIONS } from '../App';

const Line = ({ board, line, boxNum, dispatch, state, word }) => {

    const [lineClass, setLineClass] = useState('lineContainer');

    let boxes = [];
    for (let i = 0; i < boxNum; i++) {
        board[line].push('');
        boxes.push(<Box
            board={board}
            line={line}
            box={i}
            key={i}
            dispatch={dispatch}
            state={state}
            word={word}
            boxNum={boxNum}
        />)
    }

    useUpdateEffect(() => {
        if (line === state.currentLine && state.isInvalid) {
            console.log('invalid word');
            let className = 'lineContainer shakeWord';
            setLineClass(className);
            dispatch({ type: ACTIONS.RESET });
        }
        setTimeout(() => {
            setLineClass('lineContainer');
        }, 300)
    }, [state.isInvalid])



    return (
        <div className={lineClass}>
            {boxes}
        </div>
    )

}

export default Line
