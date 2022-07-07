import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    '11': '&#9820;',
    '12': '&#9822;'
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        test(state) {
            state['11'] = 'da';
        }
    }
});

export const { test } = tableSlice.actions;
export default tableSlice.reducer;