import Line from './Line';

const Board = ({ board, lineNum, boxNum, dispatch, state, word }) => {
    let lines = [];
    for (let i = 0; i < lineNum; i++) {
        board.push([]);
        lines.push(<Line
            board={board}
            key={i}
            line={i}
            boxNum={boxNum}
            dispatch={dispatch}
            state={state}
            word={word}
        />)
    }

    return (
        <div className='boardContainer'>
            {lines}
        </div>
    )
}

export default Board
