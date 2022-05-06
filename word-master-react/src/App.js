import Board from './components/Board';
import { useState, useEffect } from 'react';

function App() {

  const [value, setValue] = useState('');

  const [keyValue, setKeyValue] = useState('');

  const [currentLineValue, setCurrentLineValue] = useState(0);
  const [currentBoxValue, setCurrentBoxValue] = useState(0);

  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

  const [board, setBoard] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  const getKeyPress = (e) => {
    if (ALPHABET.includes(e.key)) {
      setKeyValue(e.key);
    }
  }

  const getNextBox = () => {
    if (currentBoxValue == 4) {
      setCurrentBoxValue(0);
      setCurrentLineValue(currentLineValue + 1);
    }
    else {
      setCurrentBoxValue(currentBoxValue + 1);
    }
  }

  useEffect(() => {
    console.log('test');
    if (!(keyValue == '')) {
      board[currentLineValue][currentBoxValue] = keyValue;
      setBoard(board);
      getNextBox();
      setKeyValue('');
    }
  }, [keyValue])

  useEffect(() => {
    document.addEventListener('keydown', getKeyPress);
    return () => { document.removeEventListener('keydown', getKeyPress) };
  }, [])

  useEffect(() => {
    console.log(currentLineValue, currentBoxValue);
  }, [currentLineValue, currentBoxValue])

  return (
    <>
      <Board board={board} keyValue={keyValue} currentLineValue={setCurrentLineValue} currentBoxValue={setCurrentBoxValue} />
    </>

  );
}

export default App;
