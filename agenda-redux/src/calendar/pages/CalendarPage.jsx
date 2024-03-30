import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import enUS from 'date-fns/locale/en-US';
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns';

import { Navbar } from "../";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

//creamos una lista de eventos, así rapidamente
//con addHours, podemos elegir una fecha y sumarle horas, en este caso 2
//aquí podemos poner eventos personalizados, los unicos obligatorios son
//title, start, y end
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
//reemplazamos por myEventList

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
      />

    </>
  )
}