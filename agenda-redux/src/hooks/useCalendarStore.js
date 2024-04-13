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


