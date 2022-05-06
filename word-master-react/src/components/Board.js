import Line from './Line';

const Board = ({ board, keyValue, lineNum = 6, currentLineValue, currentBoxValue }) => {
    let lines = [];
    for (let i = 0; i < lineNum; i++) {
        lines.push(<Line board={board} key={i} line={i} value={keyValue} currentLineValue={currentLineValue} currentBoxValue={currentBoxValue} />)
    }

    return (
        <div className='boardContainer'>
            {lines}
        </div>
    )
}

export default Board


//App(key = a) -> Board -> Lines -> Boxes