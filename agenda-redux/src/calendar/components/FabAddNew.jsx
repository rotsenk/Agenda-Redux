import { addHours } from 'date-fns'; // importar addHours
import { useCalendarStore, useUiStore } from '../../hooks'; // importamos useCalendarStore


export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore(); // de aquí me interesa tomar setActiveEvent

    const handleClickNew = () => {
        // Nuevo evento activo que voy a llamar antes de que se abra el modal
        // será de la misma estructura de lo que estoy esperando
        // debemos ir a calendarSlice, y copiarnos lo que está en "tempEvent"

        setActiveEvent({
            // ! e l i m i n ar -> _id: new Date().getTime(), no va a tener un id
            // ! no tener un id me va a dar a conocer si estoy activanto uno nuevo
            // porque si tiene id significa que estaría modificando una nota existente
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Nestor'
            }
        });
        openDateModal();
    }


  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}