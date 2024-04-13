import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del team leader',
    notes: 'Comprar una taza de spiderman pequeño',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Nestor'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null 
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        // el payload será la nueva nota con el id, y procesada, lista para guardarse
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload); // sin redux toolkit no pudiésemos utilizar el push
            // una vez se inserta la nota, sé que tengo que cerrar el modal y limpiar la nota activa
            state.activeEvent = null; // con esto limpio el evento activo

        },
    }

})

// exportar el nuevo reducer onAddNewEvent
export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;
