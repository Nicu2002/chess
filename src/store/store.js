import { configureStore } from '@reduxjs/toolkit';

import tableReducer from '../components/Table/tableSlice';
import movesReducer from '../components/Table/waysSlice';

const reducer = {
    table: tableReducer,
    posibleMoves: movesReducer
}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;