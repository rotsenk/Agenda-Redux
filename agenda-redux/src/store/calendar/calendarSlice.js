import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns'; // importar addHours

// colocar los eventos temporalmente acá
// porque estos eventos deben llegar desde el backend
const tempEvent = {
    title: 'Cumpleaños del team leader',
    notes: 'Comprar una taza de spiderman pequeño',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Nestor'
    }
};// pasamos este como primer evento en events del initialState

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null 
    },
    reducers: {
        increment: (state, /**action */) => {
            state.counter += 1;
        },
    }

})

export const { increment } = calendarSlice.actions;
