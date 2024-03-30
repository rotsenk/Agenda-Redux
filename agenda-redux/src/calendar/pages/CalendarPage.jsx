import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';


const events = [{
  title: 'Cumpleaños del team leader',
  notes: 'Comprar una taza de spiderman pequeño',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Nestor'
  }
}]


export const CalendarPage = () => {

  //este evento se va a disparar, cuando suceda algo en el calendario
  //si hago clic, lo selecciono, navego dentro del calendario
  //porque en todo momento se vuelve a reprocesar estas propiedades
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log({ event, start, end, isSelected });

    //hagamos algunas modificaciones, con un estilo genérico
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
      />

    </>
  )
}