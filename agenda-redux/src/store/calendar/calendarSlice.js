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
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            // si estamos actualizando un evento, significaría que viene con un id
            // tiene que buscar cuál es ese evento que quiere modificar o reemplazar
            // con redux toolkit podemos agarrar los eventos y sobreescribirlos
            // este map regresa un nuevo arreglo basado en el valor de retorno
            // es decir lo que sea que regrese será nuestro valor de modificar
            state.events = state.events.map( event => {
                // la magia sucede acá, si el id del evento es exactamente igual a lo que me manda en el payload
                // entonces voy a retornar el payload

                if ( event._id === payload._id ) {
                    return payload; // en el payload viene toda la info de la nota activa
                }

                return event;
            })
        }
    }

})

// exportar la acción onUpdateEvent
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;
