import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store'; 

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        if ( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) )

        } else {
            // Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
            
        }
    }

    // en realidad acá la eliminación no es síncrona tampoco
    // porque nosotros tenemos que llegar al backend, el backend lo elimina
    // y cuando el backend lo elimina, nos va a llegar una respuesta que me diga:
    // se eliminó correctamente o no se encontró ninguna nota 
    // entonces esto se debería llamar startDeletingEvent
    const startDeletingEvent = () => {
        // aquí debería llegar al backend

        dispatch( onDeleteEvent() );
    }

    return {
        //* propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // si esto es null entonces resgresa false, si tiene un objeto regresa true, en mi custom hook ya puedo saber si hay un evento seleccionado o no

        //* métodos
        startDeletingEvent, // retornar el startDeletingEvent
        setActiveEvent,
        startSavingEvent, 
    }
}


