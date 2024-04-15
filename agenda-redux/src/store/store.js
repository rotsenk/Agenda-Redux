import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer, // colocamos el calendarSlice
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false // esto es solo para que esas fechas no revise si las puede serializar
    })
})