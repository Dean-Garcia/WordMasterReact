

const getKeyboardPress = (event) => { return event.key };

const processKey = (key) => {
    switch (key) {
        case 'a':
            console.log('we did it');
            break;
        default:
            console.log('its like everything else');
            break;
    }
}
export { getKeyboardPress };
export { processKey };