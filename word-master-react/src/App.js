import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState, useEffect } from 'react';

function App() {

  const [value, setValue] = useState('');
  const [lineNum, setLineNum] = useState(6);
  const [boxNum, setBoxNum] = useState(5);

  const [keyValue, setKeyValue] = useState('');

  const [currentLineValue, setCurrentLineValue] = useState(0);
  const [currentBoxValue, setCurrentBoxValue] = useState(0);

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const [board, setBoard] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const getKeyPress = (e) => {
    let input = e.key.toUpperCase();
    if (ALPHABET.includes(input) || input == "ENTER" || input == "BACKSPACE") {
      setKeyValue(input);
    }
  }

  const getNextBox = () => {
    if (currentBoxValue == boxNum - 1 && submitted == true) {
      setCurrentBoxValue(0);
      setCurrentLineValue(currentLineValue + 1);
      setSubmitted(false);
    }
    else if (currentLineValue > lineNum - 1 || currentBoxValue == boxNum) {
      console.log('dont change anything');
    }
    else {
      setCurrentBoxValue(currentBoxValue + 1);
    }
  }

  const goToPreviousBox = () => {
    if (currentBoxValue == 0) {

    }
    else {
      setCurrentBoxValue(currentBoxValue - 1);
    }
  }

  const submitWord = () => {
    setSubmitted(true);
  }

  useEffect(() => {
    if (!(keyValue == '')) {
      if (keyValue == "ENTER") {
        if (currentBoxValue == 5) {
          submitWord();
          getNextBox();
          setKeyValue('');
        }
      }
      else if (keyValue == "<-" || keyValue == "BACKSPACE") {
        board[currentLineValue][currentBoxValue] = '';
        setBoard(board);
        goToPreviousBox();
        setKeyValue('');
      }
      else if (currentBoxValue == 4 && board[currentLineValue][currentBoxValue] != '' && submitted != true) {
        console.log('last box but occupado');
      }
      else {
        board[currentLineValue][currentBoxValue] = keyValue;
        setBoard(board);
        getNextBox();
        setKeyValue('');
      }
    }
  }, [keyValue])

  useEffect(() => {
    document.addEventListener('keydown', getKeyPress);
    return () => { document.removeEventListener('keydown', getKeyPress) };
  }, [])

  return (
    <>
      <Board
        board={board}
        keyValue={keyValue}
        lineNum={lineNum}
        boxNum={boxNum}
        currentLineValue={setCurrentLineValue}
        currentBoxValue={setCurrentBoxValue}
      />
      <Keyboard setKeyValue={setKeyValue} />
    </>

  );
}

export default App;
