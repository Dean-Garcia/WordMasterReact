import Key from './Key';

const Keyboard = ({ setKeyValue, state }) => {

  let topRow = 'QWERTYUIOP';;
  let middleRow = 'ASDFGHJKL';
  let bottomRow = 'ZXCVBNM';
  let topRowKeys = [];
  let middleRowKeys = [];
  let bottomRowKeys = [];

  for (let i = 0; i < topRow.length; i++) {
    topRowKeys.push(<Key setKeyValue={setKeyValue} key={topRow[i]} id={topRow[i]} state={state} />);
  }
  for (let i = 0; i < middleRow.length; i++) {
    middleRowKeys.push(<Key setKeyValue={setKeyValue} key={topRow[i]} id={middleRow[i]} state={state} />);
  }

  bottomRowKeys.push(<Key className='bigKey' setKeyValue={setKeyValue} key={'Enter'} id={'Enter'} state={state} />);
  for (let i = 0; i < bottomRow.length; i++) {
    bottomRowKeys.push(<Key setKeyValue={setKeyValue} key={topRow[i]} id={bottomRow[i]} state={state} />);
  }
  bottomRowKeys.push(<Key className='bigKey' setKeyValue={setKeyValue} key={'<-'} id={'<-'} state={state} />);

  return (
    <div id='keyboard' className='keyboard'>
      <div id='topRow' className='row'>{topRowKeys}</div>
      <div id='middleRow' className='row'>{middleRowKeys}</div>
      <div id='bottomRow' className='row'>{bottomRowKeys}</div>
    </div>
  )
}

export default Keyboard
