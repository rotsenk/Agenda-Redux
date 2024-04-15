import { useCalendarStore, useUiStore } from '../../hooks';


export const FabDelete = () => {
  
  // haremos que este botón sea autosuficiente
  // tomaremos la propiedad que creamos hasEventSelected
  // y con eso jugamos con el style para mostrar
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  }


  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          display: hasEventSelected ? '' : 'none'
        }} // con esto ocultamos el botón
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}