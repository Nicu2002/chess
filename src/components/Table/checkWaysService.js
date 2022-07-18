import { drawWays, togglePermision, endGame} from './waysSlice';
import { moveFigure } from './tableSlice';
import { addFigureInZone } from '../OutZone/outZoneSlice';

const whiteFigures = ['♔', '♕', '♖', '♗', '♘', '♙'];
const blackFigures = ['♚', '♛', '♜', '♝', '♞', '♟'];

//--------------------------------------------

export default (i, j, figures, createCoord, isEnemy, dispatch) => { 
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
            if (isEnemy(createCoord(i - 1, j - 1), createCoord(i, j), figures)) {
                ways.push(createCoord(i - 1, j - 1));
            }
            if (isEnemy(createCoord(i - 1, j + 1), createCoord(i, j), figures)) {
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
            if (isEnemy(createCoord(i + 1, j - 1), createCoord(i, j), figures)) {
                ways.push(createCoord(i + 1, j - 1));
            }
            if (isEnemy(createCoord(i + 1, j + 1), createCoord(i, j), figures)) {
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
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i - 1;
            x = j;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                y--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i;
            x = j + 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x++;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i;
            x = j - 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
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
                if(coord.length == 2 && (figures[coord] == null || isEnemy(createCoord(i, j), coord, figures))) {
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
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i + 1;
            x = j - 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                y++;
                x--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i - 1;
            x = j + 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x++;
                y--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i - 1;
            x = j - 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x--;
                y--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
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
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i - 1;
            x = j;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                y--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i;
            x = j + 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x++;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i;
            x = j - 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }
            y = i + 1;
            x = j + 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                y++;
                x++;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i + 1;
            x = j - 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                y++;
                x--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i - 1;
            x = j + 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x++;
                y--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
                ways.push(createCoord(y, x));
            }

            y = i - 1;
            x = j - 1;
            while(x >= 0 && x <= 7 && y >= 0 && y <= 7 && figures[createCoord(y, x)] == null) {
                ways.push(createCoord(y, x));
                x--;
                y--;
            }
            if(isEnemy(createCoord(i, j), createCoord(y, x), figures)) {
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
                if(coord.length == 2 && (figures[coord] == null || isEnemy(createCoord(i, j), coord, figures))) {
                    ways.push(coord);
                }
            }
            if(ways.length != 0) {
                dispatch(drawWays([ways, createCoord(i, j)]));
            }
            break;
    }
}