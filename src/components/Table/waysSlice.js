import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posibleMoves: [],
    curentFigure: null,
    colorPermited: 'white'
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
        }
    }
});

export const { drawWays, togglePermision} = waysSlice.actions;
export default waysSlice.reducer;
