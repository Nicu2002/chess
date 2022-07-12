import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    black: 600,
    white: 600
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        countDown(state, action) {
            state[action.payload]--; 
        } 
    }
});

export const {countDown} = timerSlice.actions;
export default timerSlice.reducer;