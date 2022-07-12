import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posibleMoves: [],
    curentFigure: null,
    colorPermited: 'white',
    colorWin: ''
};

const waysSlice = createSlice({
    name: "posibleMoves",
    initialState, 
    reducers: {
        drawWays(state, action) {
            state.curentFigure = action.payload[1];
            state.posibleMoves = [...action.payload[0]];
        },
        togglePermision(state) {
            state.colorPermited = state.colorPermited === 'white' ? 'black': 'white';
        },
        endGame(state, action) {
            state.colorPermited = '';
            state.colorWin = action.payload;
        }
    }
});

export const { drawWays, togglePermision, endGame} = waysSlice.actions;
export default waysSlice.reducer;
