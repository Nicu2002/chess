import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid} from 'uuid';

import './Table.css';

import { renderTableCells } from './TableServices';

import WinState from './../WinState/WinState';

const Table = () => {
    
    const figures = useSelector(state => state.table);
    const { posibleMoves, currentFigure, colorPermited, colorWin} = useSelector(state => state.posibleMoves);
    const dispatch = useDispatch();

    const items = renderTableCells(figures, posibleMoves, currentFigure, colorPermited, dispatch);
    const win = colorWin.length > 0 ? <WinState colorWin={colorWin}/> : null;

    return (
        <div id="table">
            {items}
            {win}
        </div>
    );
}

export default Table;
