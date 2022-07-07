import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import './Table.css';

import { drawWays } from './waysSlice';

const whiteFigures = ['♔', '♕', '♖', '♗', '♘', '♙'];
const blackFigures = ['♚', '♛', '♜', '♝', '♞', '♟'];

const Table = () => {
    const figures = useSelector(state => state.table);
    const {posibleMoves, curentFigure} = useSelector(state => state.posibleMoves);
    const dispatch = useDispatch();

    const drawCell = (i, j) => {
        return posibleMoves.includes(`${i}${j}`) ? { backgroundColor: 'red' } : null; 
    }

    const blackCell = (i, j) => <div className="black-zone" data-coord={`${i}${j}`} style={drawCell(i, j)} onClick={()=> onFigureClick(i, j)}>{figures[`${i}${j}`]}</div>;
    const whiteCell = (i, j) => <div className="white-zone" data-coord={`${i}${j}`} style={drawCell(i, j)} onClick={()=> onFigureClick(i, j)}>{figures[`${i}${j}`]}</div>;

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

    let clickStatus = 0;

    const onFigureClick = (i, j) => {
        if (clickStatus === 0 && curentFigure !==`${i}${j}`) {
            checkWays(i, j);
        }
    }

    const checkWays = (i, j) => {
        let ways = [];
        switch (figures[`${i}${j}`]) {
            case '♙':
                if (!blackFigures.includes(figures[`${i - 1}${j}`]) && !whiteFigures.includes(figures[`${i - 1}${j}`])) {
                    ways.push(`${i - 1}${j}`);
                }
                if (i === 6 && !blackFigures.includes(figures[`${i - 1}${j}`]) && !whiteFigures.includes(figures[`${i - 1}${j}`])) {
                    ways.push(`${i - 2}${j}`);
                }
                if (blackFigures.includes(figures[`${i - 1}${j - 1}`])) {
                    ways.push(`${i - 1}${j - 1}`);
                }
                if (blackFigures.includes(figures[`${i - 1}${j + 1}`])) {
                    ways.push(`${i - 1}${j + 1}`);
                }
                dispatch(drawWays([ways, `${i}${j}`]));
                break;
            case '♟':
                if (!blackFigures.includes(figures[`${i + 1}${j}`]) && !whiteFigures.includes(figures[`${i + 1}${j}`])) {
                    ways.push(`${i + 1}${j}`);
                }
                if (i === 1 && !blackFigures.includes(figures[`${i + 1}${j}`]) && !whiteFigures.includes(figures[`${i + 1}${j}`])) {
                    ways.push(`${i + 2}${j}`);
                }
                if (whiteFigures.includes(figures[`${i + 1}${j - 1}`])) {
                    ways.push(`${i + 1}${j - 1}`);
                }
                if (whiteFigures.includes(figures[`${i + 1}${j + 1}`])) {
                    ways.push(`${i + 1}${j + 1}`);
                }
                dispatch(drawWays([ways, `${i}${j}`]));
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
