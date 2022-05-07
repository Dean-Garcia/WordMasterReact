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

  const generateWord = () => {
    return 'WRECK'
  }

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const [board, setBoard] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [word, setWord] = useState(generateWord());



  const getKeyPress = (e) => {
    let input = e.key.toUpperCase();
    if (ALPHABET.includes(input) || input == "ENTER" || input == "BACKSPACE") {
      setKeyValue(input);
    }
  }

  const submitWord = () => {
    setSubmitted(true);
    console.log(checkWord());
    if (checkWord()) {
      // flip green
      console.log('you win!');
    }
    else {
      // flip clues
      // showHints();
      console.log('that wasnt the word');
    }
  }

  const checkWord = () => {
    let currentWord =
      board[currentLineValue][0] +
      board[currentLineValue][1] +
      board[currentLineValue][2] +
      board[currentLineValue][3] +
      board[currentLineValue][4];
    console.log(currentWord, word);
    if (currentWord == word) {
      return true;
    }
    else {
      return false;
    }
  }

  useEffect(() => {
    if (keyValue !== '') {
      if (keyValue == "ENTER") {
        if (currentBoxValue == boxNum) {
          submitWord();
          setCurrentBoxValue(0);
          setCurrentLineValue(currentLineValue + 1);
          setKeyValue('');
        }
      }
      else if (keyValue == "<-" || keyValue == "BACKSPACE") {
        board[currentLineValue][currentBoxValue - 1] = '';
        setBoard(board);
        if (currentBoxValue > 0) {
          setCurrentBoxValue(currentBoxValue - 1);
        }
        setKeyValue('');
      }
      else {
        board[currentLineValue][currentBoxValue] = keyValue;
        setBoard(board);
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
        setKeyValue('');
      }
    }
  }, [keyValue])

  useEffect(() => {
    document.addEventListener('keydown', getKeyPress);
    return () => { document.removeEventListener('keydown', getKeyPress) };
  }, [])

  return (
    <div className="appContainer">
      <Board
        board={board}
        keyValue={keyValue}
        lineNum={lineNum}
        boxNum={boxNum}
      />
      <Keyboard setKeyValue={setKeyValue} />
    </div>

  );
}

export default App;
