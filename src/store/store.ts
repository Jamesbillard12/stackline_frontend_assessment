import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
});

export default store;

// Optionally, export the type of the root state and dispatch for type inference in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
