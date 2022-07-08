import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    whiteZone: [],
    blackZone: []
}

const outZoneSlice = createSlice({
    name: "outZone",
    initialState,
    reducers: {
        addFigureInZone(state, action) {
            state[action.payload.zone] = [...state.whiteZone, action.payload.figure];
        }
    }
});

export const { addFigureInZone } = outZoneSlice.actions;
export default outZoneSlice.reducer;