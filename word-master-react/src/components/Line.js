import Box from './Box'

const Line = ({ board, line, value, wordNum = 5, currentLineValue, currentBoxValue }) => {


    let boxes = [];
    for (let i = 0; i < wordNum; i++) {
        boxes.push(<Box board={board} line={line} box={i} key={i} value={value} currentLineValue={currentLineValue} currentBoxValue={currentBoxValue} />)
    }

    return (
        <div className='lineContainer'>
            {boxes}
        </div>
    )

}

export default Line
