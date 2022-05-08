import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState, useEffect, useReducer } from 'react';

const generateWord = () => {
  return 'WRECK';
}

const ACTIONS = {
  NEXT_BOX: 'nextBox',
  PREVIOUS_BOX: 'previousBox',
  NEXT_LINE: 'nextLine',
}

const BACKSPACE = 'BACKSPACE';
const ENTER = 'ENTER';

const reducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case ACTIONS.NEXT_BOX:
      if (action.payload) {
        newState.currentBox = 0;
        newState.currentLine = state.currentLine + 1;
        return newState;
      }
      else if (state.currentLine > state.lineNum - 1 || state.currentBox === state.boxNum) {
        return state;
      }
      else {
        newState.currentBox++;
        return newState;
      }
    case ACTIONS.NEXT_LINE:
      newState.currentBox = 0;
      newState.currentLine++;
      return newState;
    case ACTIONS.PREVIOUS_BOX:
      return { ...newState, currentBox: state.currentBox - 1 };
    default:
      return state;
  }
}

function App() {
  const [lineNum, setLineNum] = useState(6);
  const [boxNum, setBoxNum] = useState(5);

  const [state, dispatch] = useReducer(reducer, {
    currentLine: 0, currentBox: 0, lineNum: 6, boxNum: 5
  });

  const [keyValue, setKeyValue] = useState('');

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const [board, setBoard] = useState([]);

  const [word, setWord] = useState(() => generateWord());

  const getKeyPress = (e) => {
    let input = e.key.toUpperCase();
    if (ALPHABET.includes(input) || input === "ENTER" || input === "BACKSPACE") {
      setKeyValue(input);
    }
  }

  const submitWord = () => {
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
      board[state.currentLine][0] +
      board[state.currentLine][1] +
      board[state.currentLine][2] +
      board[state.currentLine][3] +
      board[state.currentLine][4];
    if (currentWord === word) {
      return true;
    }
    else {
      return false;
    }
  }

  useEffect(() => {
    if (keyValue !== '') { // check to ensure no second fires
      if (keyValue === ENTER && state.currentBox === state.boxNum) {
        dispatch({ type: ACTIONS.NEXT_BOX, payload: true });
      }
      else if (keyValue === BACKSPACE || keyValue === "<-") {
        board[state.currentLine][state.currentBox - 1] = '';
        setBoard(board)
        dispatch({ type: ACTIONS.PREVIOUS_BOX });
      }
      else {
        board[state.currentLine][state.currentBox] = keyValue;
        setBoard(board);
        dispatch({ type: ACTIONS.NEXT_BOX });
      }
    }
    setKeyValue(''); // allows for change to repeata letters
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
