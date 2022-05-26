import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Menus from './components/Menus';
import Buttons from './components/Buttons';
import { useState, useEffect, useReducer } from 'react';
import { wordList, default as completeWordList } from './wordList.js';
import useUpdateEffect from './customHooks';
import DisplayMessage from './components/DisplayMessage';

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
  INVALID: 'invalid',
  NEWGAME: 'newGame',
  RESET_STATE: 'resetState',
  MENU: 'menu',
  ADD_MESSAGE: 'addMessage',
  CLEAR_MESSAGE: 'clearMessage',
  SET_SEED: "setSeed",
  SET_CORRECT_ARRAY: "setCorrectArray",
  TOGGLE_COLOR_BLIND_MODE: 'toggleColorBlindMode',
  TOGGLE_ENDURANCE_MODE: 'toggleEnduranceMode',
  TOGGLE_HARDMODE: 'toggleHardmode',
  TOGGLE_MENU: 'toggleMenu',
  CHANGE_THEME: 'changeTheme',
  SET_INPUT_SEED: 'setInputSeed'
}

const BACKSPACE = 'BACKSPACE';
const ENTER = 'ENTER';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


const defaultState = {
  currentLine: 0,
  currentBox: 0,
  lineNum: 6,
  boxNum: 5,
  animation: false,
  correctArray: [],
  correct: '',
  present: '',
  wrong: '',
  isInvalid: false,
  reset: true,
  menuName: '',
  toggleSetting: false,
  message: '',
  seed: 0,
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.TEST: //test to check dispatch function
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

    case ACTIONS.HINTS: // add class to boxes to do animation and change background color
      return { ...state, animation: true };

    case ACTIONS.WIN:
      return { ...state, animation: true };

    case ACTIONS.CORRECT: // add letters to 'correct' array
      return { ...state, correct: state.correct + payload };

    case ACTIONS.PRESENT: // add letters to 'present' array
      return { ...state, present: state.present + payload };

    case ACTIONS.WRONG: // add letters to not present array
      return { ...state, wrong: state.wrong + payload };

    case ACTIONS.INVALID: // valid word check
      return { ...state, isInvalid: true }

    case ACTIONS.RESET: // reset classes to be able to do animatinos again
      return { ...state, isInvalid: false }

    case ACTIONS.NEWGAME: // gets new word and resets game board
      return {
        ...defaultState,
        reset: !state.reset
      }

    case ACTIONS.RESET_STATE:
      return {... defaultState };

    case ACTIONS.MENU:
      return { ...state, menuName: payload, toggleSetting: !state.toggleSetting };

    case ACTIONS.ADD_MESSAGE:
      return { ...state, message: payload };

    case ACTIONS.CLEAR_MESSAGE:
      return { ...state, message: '' };

    case ACTIONS.SET_SEED:
      return { ...state, seed: payload }

    case ACTIONS.SET_CORRECT_ARRAY:
      return { ...state, correctArray: payload };

    default:
      return state;
  }
}

export const settingsReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.TOGGLE_MENU:
      switch (payload) {
        case 'Seed':
          if (state.isSeedVisible === true) {
            return { ...state, isSeedVisible: false }
          }
          else {
            return { ...state, isSeedVisible: true, isSettingsVisible: false, isStatsVisible: false }
          }
        case 'Settings':
          if (state.isSettingsVisible === true) {
            return { ...state, isSettingsVisible: false }
          }
          else {
            return { ...state, isSeedVisible: false, isSettingsVisible: true, isStatsVisible: false }
          }
        case 'Stats':
          if (state.isStatsVisible === true) {
            return { ...state, isStatsVisible: false }
          }
          else {
            return { ...state, isSeedVisible: false, isSettingsVisible: false, isStatsVisible: true }
          }
        default:
          console.log('setting not implemented yet?');
          break;
      }
      break;
    case ACTIONS.TOGGLE_ENDURANCE_MODE:
      return { ...state, enduranceMode: !state.enduranceMode }
    case ACTIONS.TOGGLE_COLOR_BLIND_MODE:
      return { ...state, colorBlindMode: !state.colorBlindMode }
    case ACTIONS.TOGGLE_HARDMODE:
      return { ...state, hardmode: !state.hardmode }
    case ACTIONS.CHANGE_THEME:
      return { ...state, theme: payload };
    case ACTIONS.SET_INPUT_SEED:
      return { ...state, inputSeed: payload }

  }
}

function App() {
  const [lineNum, setLineNum] = useState(6);
  const [boxNum, setBoxNum] = useState(5);


  const [settingsState, settingsDispatch] = useReducer(
    settingsReducer, {
    isSettingsVisible: false,
    isSeedVisible: false,
    isStatsVisible: false,
    hardmode: false,
    enduranceMode: false,
    colorBlindMode: false,
    theme: 'dark',
    inputSeed: 0
  });

  const [state, dispatch] = useReducer(reducer, defaultState);

  const generateSeed = (letterIndex, wordIndex) => {
    let wordIndexDigits;
    wordIndex = wordIndex.toString();

    //insert random numbers to obscure word letter
    let firstRanDigits = getRandomNumber(1, 10);
    let secondRanDigits = getRandomNumber(0, 10);
    let thirdRanDigits = getRandomNumber(0, 10);

    //add 0's to keep number length
    let letterIndexDigits = ("0" + letterIndex).slice(-2);
    if (wordIndex.length == 1) {
      wordIndexDigits = ("000" + wordIndex);
    }
    else if (wordIndex.length == 2) {
      wordIndexDigits = ("00" + wordIndex);
    }
    else if (wordIndex.length == 3) {
      wordIndexDigits = ("0" + wordIndex);
    }
    else {
      wordIndexDigits = wordIndex;
    }

    // put seed together, X,####X,##X
    let seed = firstRanDigits + wordIndexDigits + secondRanDigits + letterIndexDigits + thirdRanDigits;

    return seed;
  }

  const getIndicesFromSeed = (seed) => {
    if (seed >= 100000000 && seed < 999999999) {
      let wordIndex = seed.slice(1, 5);
      let letterIndex = seed.slice(6, 8);
      wordIndex = Number(wordIndex);
      letterIndex = Number(letterIndex);
      console.log(seed, wordIndex, letterIndex);
      return [letterIndex, wordIndex];
    }
    else {
      displayMessage("Invalid Seed Entered", 1000);
    }
  }

  const generateWord = () => {
    let randomLetterIndex;
    let randomWordIndex;
    let generatedWord;
    try {
      randomLetterIndex = getRandomNumber(0, 24);
      let listLength = wordList[randomLetterIndex].length;
      randomWordIndex = getRandomNumber(0, listLength);
      generatedWord = wordList[randomLetterIndex][randomWordIndex].toUpperCase();
      console.log(generatedWord, randomLetterIndex, randomWordIndex);
      let seed = generateSeed(randomLetterIndex, randomWordIndex);
      let correctArray = generateCorrectArray();
      dispatch({ type: ACTIONS.SET_SEED, payload: seed });
      dispatch({ type: ACTIONS.SET_CORRECT_ARRAY, payload: correctArray });
      return generatedWord;
    }
    catch (e) {
      console.log(e);
      console.log('there was an error getting the word at ', randomLetterIndex, randomWordIndex, generatedWord);
      return generateWord();
    }
  }

  const generateCorrectArray = () => {
    let correctArray = [];
    for (let i = 0; i < boxNum; i++) {
      correctArray.push('');
    }
    return correctArray;
  }



  const [keyValue, setKeyValue] = useState('');

  const [board, setBoard] = useState([]);

  const [word, setWord] = useState(() => generateWord());

  const displayMessage = (message, timeInMilliseconds) => {
    dispatch({ type: ACTIONS.ADD_MESSAGE, payload: message });
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_MESSAGE });
    }, timeInMilliseconds);
  }

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
      if (state.currentLine == (lineNum - 1)) {
        displayMessage(`You Lose! The word was ${word}`, 3000);
      }
      return false;
    }
  }

  const checkIfValid = (currentWord) => {
    let firstLetter = currentWord[0];
    let letterIndex = ALPHABET.indexOf(firstLetter);

    if (settingsState.hardmode) {
      for (let i = 0; i < boxNum; i++) {
        if (state.correctArray[i] != '') {
          if (board[state.currentLine][i] != state.correctArray[i]) {
            return 0;
          }
        }
      }
    }
    if (completeWordList[letterIndex].includes(currentWord)) {
      return 1;
    }
    return -1;
  }


  const submitWord = (currentWord) => {
    if (checkForWin(currentWord)) {
      displayMessage('You Win!', 2000);
      dispatch({ type: ACTIONS.HINTS });

      if (settingsState.enduranceMode) {
        setTimeout(() => {
          dispatch({ type: ACTIONS.NEWGAME });
        }, 3000);
        setTimeout(() => {
          let newBoard = [[]];
          for (let i = 0; i < currentWord.length; i++) {
            newBoard[0].push(currentWord[i]);
          }
          setBoard(newBoard);
          dispatch({ type: ACTIONS.HINTS });
          // atm does not check if new random word could possibly be old word
        }, 4000)
      }
    }
    else if (checkIfValid(currentWord) > 0) {
      dispatch({ type: ACTIONS.HINTS });
    }
    else {
      if (settingsState.hardmode && state.currentLine != 0) {
        if (checkIfValid(currentWord) == 0) {
          displayMessage("Hard mode is enabled, green letters must be used", 4000);
        }
        else {
          displayMessage(`That's not an acceptable word`, 2000);
        }
      }
      else {
        displayMessage(`That's not an acceptable word`, 2000);
      }
      dispatch({ type: ACTIONS.INVALID });
    }
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
          submitWord(currentWord);
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

  useUpdateEffect(() => { //resets game
    setBoard(() => []);
    displayMessage('New Word Obtained', 1000);
    setWord(() => generateWord());
  }, [state.reset])

  useUpdateEffect(() => {
    if (settingsState.hardmode) {
      displayMessage('Hard Mode Enabled', 1000);
    }
    else {
      displayMessage('Hard Mode Disabled', 1000);

    }
  }, [settingsState.hardmode])

  useUpdateEffect(() => {
    if (settingsState.enduranceMode) {
      displayMessage('Endurance Mode Enabled', 1000);
    }
    else {
      displayMessage('Endurance Mode Disabled', 1000);
    }
  }, [settingsState.enduranceMode])

  useUpdateEffect(() => {
    displayMessage('Not Currently Implemented', 1000);
  }, [settingsState.colorBlindMode])

  useUpdateEffect(() => {
    let [letterIndex, wordIndex] = getIndicesFromSeed(settingsState.inputSeed)
    let newWord = wordList[letterIndex][wordIndex].toUpperCase();
    dispatch({ type: ACTIONS.RESET_STATE });
    setBoard(() => []);
    setWord(() => newWord);
    displayMessage('New Word Obtained', 1000);
    console.log(newWord);
  }, [settingsState.inputSeed])

  return (
    <div className="appContainer">
      <DisplayMessage message={state.message} />
      <Menus state={state} settingsState={settingsState} dispatch={dispatch} settingsDispatch={settingsDispatch} />
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
      <Buttons className='buttonContainer' dispatch={dispatch} state={state} />
    </div>
  );
}

export default App;
