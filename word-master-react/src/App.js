import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState, useEffect, useReducer } from 'react';
import { wordList, default as completeWordList } from './wordList.js';

const generateWord = () => {
  let randomLetterIndex;
  let randomWordIndex;
  let generatedWord;
  try {
    randomLetterIndex = getRandomNumber(0, 24);
    let listLength = wordList[randomLetterIndex].length;
    randomWordIndex = getRandomNumber(0, listLength);
    console.log(randomLetterIndex, randomWordIndex);
    generatedWord = wordList[randomLetterIndex][randomWordIndex].toUpperCase();
    console.log(generatedWord);
    return generatedWord;

  }
  catch (e) {
    console.log('there was an error?', randomLetterIndex, randomWordIndex, generatedWord);
    return generateWord();
  }

}

function getRandomNumber(min, max) { //taken from internet for RNG
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const ACTIONS = {
  NEXT_BOX: 'nextBox',
  PREVIOUS_BOX: 'previousBox',
  NEXT_LINE: 'nextLine',
  ANIMATION: 'animations',
  HINTS: 'hints',
  WIN: 'win',
  TEST: 'test',
  CORRECT: 'correct',
  PRESENT: 'present',
  WRONG: 'wrong',
  INVALID: 'invalid'
}

const BACKSPACE = 'BACKSPACE';
const ENTER = 'ENTER';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.TEST:
      return state;
    case ACTIONS.NEXT_BOX:
      if (payload) {
        return { ...state, currentBox: 0, currentLine: state.currentLine + 1, animation: false }
      }
      else if (state.currentLine > state.lineNum - 1 || state.currentBox === state.boxNum) {
        return state;
      }
      else {
        return { ...state, currentBox: state.currentBox + 1 };
      }
    case ACTIONS.NEXT_LINE:
      return { ...state, currentBox: 0, currentLine: state.currentLine + 1 }
    case ACTIONS.PREVIOUS_BOX:
      if (state.currentBox === 0) {
        return state;
      }
      return { ...state, currentBox: state.currentBox - 1 };
    case ACTIONS.HINTS:
      return { ...state, animation: true };
    case ACTIONS.WIN:
      return { ...state, animation: true };
    case ACTIONS.CORRECT:
      return { ...state, correct: state.correct + payload };
    case ACTIONS.PRESENT:
      return { ...state, present: state.present + payload };
    case ACTIONS.WRONG:
      return { ...state, wrong: state.wrong + payload };
    case ACTIONS.INVALID:
      return { ...state, isInvalid: true }
    case ACTIONS.RESET:
      return { ...state, isInvalid: false }
    default:
      return state;
  }
}

function App() {
  const [lineNum, setLineNum] = useState(6);
  const [boxNum, setBoxNum] = useState(5);

  const [state, dispatch] = useReducer(reducer, {
    currentLine: 0, currentBox: 0, lineNum: 6, boxNum: 5, animation: false, correct: '', present: '', wrong: '', isInvalid: false
  });

  const [keyValue, setKeyValue] = useState('');

  const [board, setBoard] = useState([]);

  const [word, setWord] = useState(() => generateWord());

  const getKeyPress = (e) => {
    let input = e.key.toUpperCase();
    if (ALPHABET.includes(input) || input === "ENTER" || input === "BACKSPACE") {
      setKeyValue(input);
    }
  }

  const checkForWin = (currentWord) => {
    if (currentWord === word) {
      return true;
    }
    else {
      return false;
    }
  }

  const checkIfValid = (currentWord) => {
    let firstLetter = currentWord[0];
    let letterIndex = ALPHABET.indexOf(firstLetter);
    if (completeWordList[letterIndex].includes(currentWord)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (keyValue !== '') { // check to ensure no second fires
      if (keyValue === ENTER) {
        if (state.currentBox === state.boxNum) {
          let currentWord = board[state.currentLine][0] +
            board[state.currentLine][1] +
            board[state.currentLine][2] +
            board[state.currentLine][3] +
            board[state.currentLine][4];
          if (checkForWin(currentWord)) {
            console.log('you win');
            dispatch({ type: ACTIONS.HINTS });
          }
          else if (checkIfValid(currentWord)) {
            dispatch({ type: ACTIONS.HINTS });
          }
          else {
            dispatch({ type: ACTIONS.INVALID });
          }
        }
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
        state={state}
        dispatch={dispatch}
        word={word}
      />
      <Keyboard setKeyValue={setKeyValue} state={state} />
    </div>

  );
}

export default App;
