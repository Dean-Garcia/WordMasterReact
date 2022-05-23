import { useState, useEffect } from 'react';
import React from 'react';
import { ACTIONS, reducer } from '../App.js';
import useUpdateEffect from '../customHooks.js';

const Key = ({ id, className, state, setKeyValue }) => {

  const [keyClass, setKeyClass] = useState(className);

  const handleClick = (e) => {
    setKeyValue(e.target.id.toUpperCase());
  }

  const changeClass = () => {
    if (state.correct.includes(id)) {
      className += ' correct'
    }
    else if (state.present.includes(id)) {
      className += ' present'
    }
    else if (state.wrong.includes(id)) {
      className += ' wrong'
    }
    setKeyClass(className);
  }

  const resetClass = () => {
    setKeyClass("key");
  }

  useUpdateEffect(() => {
    changeClass();
  }, [state.animation])

  useUpdateEffect(() => {
    if (!keyClass.includes('bigKey')) {
      resetClass();
    }
  }, [state.reset])

  return (
    <div id={id} tabIndex="0" className={keyClass} onClick={handleClick}>
      {id}
    </div >

  );
}

Key.defaultProps = { className: "key", }

export default Key
