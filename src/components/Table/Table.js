import { useSelector, useDispatch } from 'react-redux';

import './Table.css';

const Table = () => {

    const state = useSelector(state => state);
    console.log(state);
    const dispatch = useDispatch();

    const blackCell = (i, j) => <div className="black-zone" data-coord={`${i}${j}`}>{state[`${i}${j}`]}</div>;
    const whiteCell = (i, j) => <div className="white-zone" data-coord={`${i}${j}`}>{state[`${i}${j}`]}</div>;

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

    const items = renderTableCells();
    
    return (
        <div id="table">
            {items}
        </div>
    );
}

export default Table;
