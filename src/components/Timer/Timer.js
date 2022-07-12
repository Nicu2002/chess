import { useSelector, useDispatch } from 'react-redux';
import {countDown} from './timerSlice';

import './Timer.css'

const Timer = () => {
    const {white, black} = useSelector(state => state.timer);
    const dispatch = useDispatch();

    const startCountDown = (color) => {
        dispatch(countDown(color));
    }
    return (
        <div id="timer">
            <div className="player-time">
                <button onClick={()=> startCountDown('white')} className='stop-timer'></button>
                <p className='timer-duration'>12:53</p>
            </div>
            <div className="player-time">
                <p className='timer-duration'>7:23</p>
                <button onClick={()=>dispatch(countDown('black'))} className='stop-timer'></button>
            </div>
        </div>
    );
}

export default Timer;