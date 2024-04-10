import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './'; // importamos calendarSlice

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer, // colocamos el calendarSlice
        ui: uiSlice.reducer
    }
})