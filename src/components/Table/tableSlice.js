import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    '00': '♜',
    '01': '♞',
    '02': '♝',
    '03': '♛',
    '04': '♚',
    '05': '♝',
    '06': '♞',
    '07': '♜',
    '10': '♟',
    '11': '♟',
    '12': '♟',
    '13': '♟',
    '14': '♟',
    '15': '♟',
    '16': '♟',
    '17': '♟',
    '20': null,
    '21': null,
    '22': null,
    '23': null,
    '24': null,
    '25': null,
    '26': null,
    '27': null,
    '30': null,
    '31': null,
    '32': null,
    '33': null,
    '34': null,
    '35': null,
    '36': null,
    '37': null,
    '40': null,
    '41': null,
    '42': null,
    '43': null,
    '44': null,
    '45': null,
    '46': null,
    '47': null,
    '50': null,
    '51': null,
    '52': null,
    '53': null,
    '54': null,
    '55': null,
    '56': null,
    '57': null,
    '60': '♙',
    '61': '♙',
    '62': '♙',
    '63': '♙',
    '64': '♙',
    '65': '♙',
    '66': '♙',
    '67': '♙',
    '70': '♖',
    '71': '♘',
    '72': '♗',
    '73': '♕',
    '74': '♔',
    '75': '♗',
    '76': '♘',
    '77': '♖',
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        moveFigure(state, action) {
            state[action.payload.finish] = action.payload.figure;
            state[action.payload.start] = null;
        }
    }
});

export const { moveFigure } = tableSlice.actions;
export default tableSlice.reducer;