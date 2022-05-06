const Key = ({ id, className, setKeyValue }) => {

  const handleClick = (e) => {
    setKeyValue(e.target.id.toUpperCase());
  }

  return (
    <div id={id} tabIndex="0" className={className} onClick={handleClick}>
      {id}
    </div >

  );
}

Key.defaultProps = { className: "key", }

export default Key
