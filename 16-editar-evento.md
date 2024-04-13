# Editar el evento activo

En esta sección, quiero que hagamos la actualización de el evento, es decir si estoy en el evento y necesito modificar algo y guardar, quiero que eso literalmente quede afectado porque actualmente aunque pareciera que sí, no es persistente esa parte aún.

Vámonos a nuestro `calendarSlice.js`, ocupamos un reducer nuevo...

```jsx
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
```

Ahora, nos vamos a nuestro `useCalendarStore.jsx` para la parte de la actualización

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from '../store'; // importar onUpdateEvent

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        if ( calendarEvent._id ) {
            // Actualizando
            // mandamos el payload, que en este caso es calendarEvent
            dispatch( onUpdateEvent({ ...calendarEvent }) )

        } else {
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
            
        }
    }

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
        setActiveEvent,
        startSavingEvent, // colocar acá el startSavingEvent
    }
}
``` 

Esto en el navegador, me podría dar una falsa sensación de que lo hizo bien, pero revisemos en el Tree del redux en el navegador, y veamos...
Podemos observar que sí se están realizando los cambios.

En la próxima sección haremos la eliminación de un evento...