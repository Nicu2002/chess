

import './Timer.css'

const Timer = () => {

    return (
        <div id="timer">
            <div className="player-time">
                <button className='stop-timer'></button>
                <p className='timer-duration'>12:53</p>
            </div>
            <div className="player-time">
                <p className='timer-duration'>7:23</p>
                <button className='stop-timer'></button>
            </div>
        </div>
    );
}

export default Timer;