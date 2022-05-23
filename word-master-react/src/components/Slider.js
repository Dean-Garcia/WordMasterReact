import React from 'react'

const Slider = ({ name, settingsDispatch }) => {

    const handleClick = () => {
        console.log('hello', name);
    }

    return (
        <div >
            {name} < label className="switch" >
                <input onClick={handleClick} type="checkbox" />
                <span className="slider round"></span>
            </label >
        </div>
    )
}

export default Slider
