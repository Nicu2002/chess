import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posibleMoves: [],
    curentFigure: null
};

const waysSlice = createSlice({
    name: "posibleMoves",
    initialState, 
    reducers: {
        drawWays(state, action) {
            state.curentFigure = action.payload[1];
            state.posibleMoves = [...action.payload[0]];
        }
    }
});

export const { drawWays } = waysSlice.actions;
export default waysSlice.reducer;
