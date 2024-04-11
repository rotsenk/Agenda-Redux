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
        // de la action extraemos el payload, ya sea que podemos mandat toda la nota o sólo el id
        //tratemos de manejar esto lo más homogéneo posible
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload; // lo que sea que le mande, se va a activar
        },
    }

})

export const { onSetActiveEvent } = calendarSlice.actions;
