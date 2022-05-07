import Box from './Box'

const Line = ({ board, line, value, boxNum }) => {


    let boxes = [];
    for (let i = 0; i < boxNum; i++) {
        board[line].push('');
        boxes.push(<Box
            board={board}
            line={line}
            box={i}
            key={i}
            value={value}
        />)
    }

    return (
        <div className='lineContainer'>
            {boxes}
        </div>
    )

}

export default Line
