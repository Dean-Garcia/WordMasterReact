import Box from './Box'

const Line = ({ board, line, boxNum, dispatch, state, word }) => {

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

    return (
        <div className='lineContainer'>
            {boxes}
        </div>
    )

}

export default Line
