import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    white: [],
    black: []
}

const outZoneSlice = createSlice({
    name: "outZone",
    initialState,
    reducers: {
        addFigureInZone(state, action) {
            state[action.payload.zone] = [...state[action.payload.zone], action.payload.figure];
        }
    }
});

export const { addFigureInZone } = outZoneSlice.actions;
export default outZoneSlice.reducer;