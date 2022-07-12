import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid} from 'uuid';

import './Table.css';

import { drawWays, togglePermision } from './waysSlice';
import { moveFigure } from './tableSlice';
import { addFigureInZone } from '../OutZone/outZoneSlice';


const whiteFigures = ['♔', '♕', '♖', '♗', '♘', '♙'];
const blackFigures = ['♚', '♛', '♜', '♝', '♞', '♟'];

const Table = () => {
    
    const figures = useSelector(state => state.table);
    const { posibleMoves, curentFigure, colorPermited} = useSelector(state => state.posibleMoves);
    const { whiteZone, blackZone } = useSelector(state => state.outZone);
    const dispatch = useDispatch();

    const drawCell = (i, j) => {
        return posibleMoves.includes(`${i}${j}`) ? { backgroundColor: 'red' } : null; 
    }

    const blackCell = (i, j) =>
        <div
            key={uuid()}
            className="black-zone"
            data-coord={`${i}${j}`}
            style={drawCell(i, j)}
            onClick={() => onFigureClick(i, j)}>
            {figures[`${i}${j}`]}
        </div>;
    const whiteCell = (i, j) =>
        <div
            key={uuid()}
            className="white-zone"
            data-coord={`${i}${j}`}
            style={drawCell(i, j)}
            onClick={() => onFigureClick(i, j)}>
            {figures[`${i}${j}`]}
        </div>;

    const renderTableCells = () => {
        let cells = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j+=2) {
                if ([0, 2, 4, 6].includes(i)) {
                    cells.push(whiteCell(i, j));
                    cells.push(blackCell(i, j + 1))
                }
                else {
                    cells.push(blackCell(i, j));
                    cells.push(whiteCell(i, j + 1));
                }
            }
        }
        return cells;
    }

    const isEnemy = (coordsFig1, coordsFig2) => {
        if (blackFigures.includes(figures[coordsFig1]) && blackFigures.includes(figures[coordsFig2]) || whiteFigures.includes(figures[coordsFig1]) && whiteFigures.includes(figures[coordsFig2]) || figures[coordsFig1] == null || figures[coordsFig2] == null) {
            return false;
        }
        return true;
    }

    const checkColor = (i, j) => {
        return blackFigures.includes(figures[createCoord(i, j)]) ? 'black' : 'white';
    }

    const onFigureClick = (i, j) => {
        if (figures[createCoord(i, j)] !== null && curentFigure !== createCoord(i, j) && colorPermited == checkColor(i, j)) {
            checkWays(i, j);
        }
        if ((figures[createCoord(i, j)] === null || isEnemy(createCoord(i, j), curentFigure)) && curentFigure !== null && posibleMoves.includes(createCoord(i, j))) {
            dispatch(moveFigure({ start: curentFigure, finish: createCoord(i, j), figure: figures[curentFigure] }));
            dispatch(drawWays([[], null]));
            dispatch(togglePermision());
        }
        if (isEnemy(createCoord(i, j), curentFigure)) {
            dispatch(addFigureInZone({ zone: checkColor(i, j), figure: figures[createCoord(i, j)] }));
        }
    }

    const createCoord = (y, x) => `${y}${x}`;

    const checkWays = (i, j) => {
        let ways = [];
        let cells;
        let y, x;
        switch (figures[createCoord(i, j)]) {
            case '♙':
                if (figures[createCoord(i - 1, j)] == null) {
                    ways.push(createCoord(i - 1, j));
                }
                if (i === 6 && figures[createCoord(i - 1, j)] == null && figures[createCoord(i - 2, j)] == null) {
                    ways.push(createCoord(i - 2, j));
                }
                if (isEnemy(createCoord(i - 1, j - 1), createCoord(i, j))) {
                    ways.push(createCoord(i - 1, j - 1));
                }
                if (isEnemy(createCoord(i - 1, j + 1), createCoord(i, j))) {
                    ways.push(createCoord(i - 1, j + 1));
                }
                dispatch(drawWays([ways, createCoord(i, j)]));
                break;
            case '♟':
                if (figures[createCoord(i + 1, j)] == null) {
                    ways.push(createCoord(i + 1, j));
                }
                if (i === 1 && figures[createCoord(i + 1, j)] == null && figures[createCoord(i + 2, j)] == null) {
                    ways.push(createCoord(i + 2, j));
                }
                if (isEnemy(createCoord(i + 1, j - 1), createCoord(i, j))) {
                    ways.push(createCoord(i + 1, j - 1));
                }
                if (isEnemy(createCoord(i + 1, j + 1), createCoord(i, j))) {
                    ways.push(createCoord(i + 1, j + 1));
                }
                dispatch(drawWays([ways, createCoord(i, j)]));
                break;
            case '♜':
            case '♖':
                y = i + 1;
                x = j;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y++;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i - 1;
                x = j;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i;
                x = j + 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x++;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i;
                x = j - 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }
                if(ways.length != 0) {
                    dispatch(drawWays([ways, createCoord(i, j)]));
                }
                break;
            case '♘':
            case '♞':
                cells = [
                    createCoord(i - 2, j + 1),
                    createCoord(i - 2, j - 1),
                    createCoord(i - 1, j + 2),
                    createCoord(i + 1, j + 2),
                    createCoord(i + 2, j + 1),
                    createCoord(i + 2, j - 1),
                    createCoord(i - 1, j - 2),
                    createCoord(i + 1, j - 2)
                ]
                for (let coord of cells) {
                    if(coord.length == 2 && (figures[coord] == null || isEnemy(createCoord(i, j), coord))) {
                        ways.push(coord);
                    }
                }
                if(ways.length != 0) {
                    dispatch(drawWays([ways, createCoord(i, j)]));
                }
                break;
            case '♝':
            case '♗':
                y = i + 1;
                x = j + 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y++;
                    x++;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i + 1;
                x = j - 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y++;
                    x--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i - 1;
                x = j + 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x++;
                    y--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i - 1;
                x = j - 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x--;
                    y--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }
                if(ways.length != 0) {
                    dispatch(drawWays([ways, createCoord(i, j)]));
                }
                break;

            case '♕':
            case '♛':
                y = i + 1;
                x = j;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y++;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i - 1;
                x = j;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i;
                x = j + 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x++;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i;
                x = j - 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }
                y = i + 1;
                x = j + 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y++;
                    x++;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i + 1;
                x = j - 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    y++;
                    x--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i - 1;
                x = j + 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x++;
                    y--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }

                y = i - 1;
                x = j - 1;
                while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                    ways.push(createCoord(y, x));
                    x--;
                    y--;
                }
                if(isEnemy(createCoord(i, j), createCoord(y, x))) {
                    ways.push(createCoord(y, x));
                }
                if(ways.length != 0) {
                    dispatch(drawWays([ways, createCoord(i, j)]));
                }
                break;
            case '♚':
            case '♔':
                cells = [
                    createCoord(i + 1, j),
                    createCoord(i + 1, j + 1),
                    createCoord(i + 1, j - 1),
                    createCoord(i - 1, j),
                    createCoord(i - 1, j + 1),
                    createCoord(i - 1, j - 1),
                    createCoord(i, j + 1),
                    createCoord(i, j - 1)
                ]
                for (let coord of cells) {
                    if(coord.length == 2 && (figures[coord] == null || isEnemy(createCoord(i, j), coord))) {
                        ways.push(coord);
                    }
                }
                if(ways.length != 0) {
                    dispatch(drawWays([ways, createCoord(i, j)]));
                }
                break;
        }
    }

    const items = renderTableCells();
    
    return (
        <div id="table">
            {items}
        </div>
    );
}

export default Table;
