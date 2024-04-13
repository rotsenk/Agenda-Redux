import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store'; // importar onAddNewEvent

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }

    // disparar acciones síncronas, no vamos a tener thunks asíncronos
    // creamos algo parecido a los thunks
    // cuando dice la palabra start esto inicia el proceso de grabación
    const startSavingEvent = async( calendarEvent ) => {
        // idealmente esto debe llegar al backend, pero vamos a simular algo acá

        // si el calendarEvent tiene el id entonces significa que estoy actualizando
        // caso contrario, estoy creando, y si es así mandaré a llamar onAddNewevent
        if ( calendarEvent._id ) {
            // Actualizando

        } else {
            // Creando
            // le tengo que mandar el payload, este es el evento del calendario listo con su id
            // pero, este evento del calendario es uno nuevo y no tengo el id, debo ponerle algo ficticio
            // le paso todo con el spread, y luego le agrego un id, esto es simulado
            // porque en realidad el id lo debe venir del backend, y se debe remover de aca
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


