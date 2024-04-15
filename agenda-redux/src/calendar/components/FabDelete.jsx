import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  // modificaciones para que el botón de eliminar no aparezca al abrir y cerrar modal
  const { isDateModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  }


  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          display: hasEventSelected && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}