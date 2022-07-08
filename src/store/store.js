import { configureStore } from '@reduxjs/toolkit';

import tableReducer from '../components/Table/tableSlice';
import movesReducer from '../components/Table/waysSlice';
import outZoneReducer from '../components/OutZone/outZoneSlice';

const reducer = {
    table: tableReducer,
    posibleMoves: movesReducer,
    outZone: outZoneReducer
}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;