import {v4 as uuid} from 'uuid';
import checkWays from './checkWaysService';

import { drawWays, togglePermision, endGame} from './waysSlice';
import { moveFigure } from './tableSlice';
import { addFigureInZone } from '../OutZone/outZoneSlice';

const whiteFigures = ['♔', '♕', '♖', '♗', '♘', '♙'];
const blackFigures = ['♚', '♛', '♜', '♝', '♞', '♟'];

//--------------------------------------------

const drawCell = (i, j, posibleMoves) => {
    return posibleMoves.includes(`${i}${j}`) ? { backgroundColor: 'red' } : null; 
} 

//--------------------------------------------

const tableCell = (i, j, figures, posibleMoves, currentFigure, colorPermited, dispatch, color) =>
    <div
        key={uuid()}
        className={`${color}-zone cell`}
        data-coord={`${i}${j}`}
        style={drawCell(i, j, posibleMoves)}
        onClick={() => onFigureClick(i, j, figures, currentFigure, colorPermited, posibleMoves, dispatch)}>
        {figures[`${i}${j}`]}
    </div>; 

//--------------------------------------------

const isEnemy = (coordsFig1, coordsFig2, figures) => {
    if (blackFigures.includes(figures[coordsFig1]) && blackFigures.includes(figures[coordsFig2]) || whiteFigures.includes(figures[coordsFig1]) && whiteFigures.includes(figures[coordsFig2]) || figures[coordsFig1] == null || figures[coordsFig2] == null) {
        return false;
    }
    return true;
} 

//--------------------------------------------

const checkColor = (i, j, figures) => {
    return blackFigures.includes(figures[createCoord(i, j)]) ? 'black' : 'white';
}

//--------------------------------------------

const createCoord = (y, x) => `${y}${x}`;

//--------------------------------------------

const onFigureClick = (i, j, figures, currentFigure, colorPermited, posibleMoves, dispatch) => {
    if (figures[createCoord(i, j)] !== null && currentFigure !== createCoord(i, j) && colorPermited == checkColor(i, j, figures)) {
        checkWays(i, j, figures, createCoord, isEnemy, dispatch);
        
    }
    if ((figures[createCoord(i, j)] === null || isEnemy(createCoord(i, j), currentFigure, figures)) && currentFigure !== null && posibleMoves.includes(createCoord(i, j))) {
        dispatch(moveFigure({ start: currentFigure, finish: createCoord(i, j), figure: figures[currentFigure] }));
        dispatch(drawWays([[], null]));
        dispatch(togglePermision());
    }
    if (isEnemy(createCoord(i, j), currentFigure, figures)) {
        dispatch(addFigureInZone({ zone: checkColor(i, j, figures), figure: figures[createCoord(i, j)] }));
        if(['♔', '♚'].includes(figures[createCoord(i, j)])) {
            dispatch(endGame(checkColor(i, j, figures) == 'black' ? 'white' : 'black'));
        }
    }
}

//--------------------------------------------

export const renderTableCells = (figures, posibleMoves, currentFigure, colorPermited, dispatch) => {
    let cells = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j+=2) {
            if ([0, 2, 4, 6].includes(i)) {
                cells.push(tableCell(i, j, figures, posibleMoves, currentFigure, colorPermited, dispatch, 'white'));
                cells.push(tableCell(i, j + 1, figures, posibleMoves, currentFigure, colorPermited, dispatch, 'black'))
            }
            else {
                cells.push(tableCell(i, j, figures, posibleMoves, currentFigure, colorPermited, dispatch, 'black'));
                cells.push(tableCell(i, j + 1, figures, posibleMoves, currentFigure, colorPermited, dispatch, 'white'));
            }
        }
    }
    return cells;
} 
