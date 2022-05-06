import Line from './Line';

const Board = ({ board, keyValue, lineNum, currentLineValue, currentBoxValue }) => {
    let lines = [];
    for (let i = 0; i < lineNum; i++) {
        board.push([]);
        lines.push(<Line
            board={board}
            key={i}
            line={i}
            value={keyValue}
            // wordNum={wordNum}
            currentLineValue={currentLineValue}
            currentBoxValue={currentBoxValue}
        />)
    }

    return (
        <div className='boardContainer'>
            {lines}
        </div>
    )
}

export default Board
