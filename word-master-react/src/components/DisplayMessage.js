import { React, useEffect, useState } from 'react'

const DisplayMessage = ({ message }) => {

    const [componentClass, setClass] = useState('displayMessage');

    useEffect(() => {
        if (message === '') {
            setClass(() => 'displayMessage');
        }
        else {
            setClass(() => 'displayMessage show');
        }
    }, [message])

    return (
        <div className={componentClass}>
            {message}
        </div>
    )
}

export default DisplayMessage

