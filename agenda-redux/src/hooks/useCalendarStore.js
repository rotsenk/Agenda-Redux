import { useSelector } from 'react-redux';

export const useCalendarStore = () => {
    // 1. tomaremos los eventos que tenemos en calendarSlice

    const { events, activeEvent } = useSelector( state => state.calendar );

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
    }
}


