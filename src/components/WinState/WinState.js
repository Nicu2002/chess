
const WinState = ({colorWin}) => {
    return(
        <div id="end-game">
            <p id="win-header">{colorWin.toUpperCase()} WIN</p>
            <button onClick={() => window.location.reload()}>PLAY AGAIN</button>
        </div>
    );
}

export default WinState;