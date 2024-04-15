import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"; // aquí se importa el FabDelete
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();

  const { events, setActiveEvent } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'agenda');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    
    return{
      style
    }

  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChange = ( event ) => {

    localStorage.setItem('lastView', event );
    setLastView( event );
    
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
        defaultView={ lastView }
      />

       <CalendarModal />

       <FabAddNew />

       {/* Renderizar FabDelete */}
       <FabDelete />

    </>
  )
}