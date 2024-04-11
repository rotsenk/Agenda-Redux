import { useDispatch, useSelector } from 'react-redux'; // importar useDispatch
import { onSetActiveEvent } from '../store'; // importar onSetActiveEvent

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );

    // creamos la constante
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }// este es mi primer método que voy a exponer

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
        setActiveEvent
    }
}


