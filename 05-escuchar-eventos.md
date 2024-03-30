# Escuchar eventos del Calendario

En esta sección, hay 3 eventos que me interesan que definamos:
1. cuando yo hago Clic en un evento quiero saber qué evento le dice Clic 
2. necesito poder hacer doble Clic en el evento y poder abrir un modal en el cual voy a tener la información del evento que se le hizo doble Clic 
3. la opción de cuando se cambia el view porque cuando yo recargue navegador web quiero estar exactamente en la misma lista de semana, día, area, lo que sea quiero estar en el mismo evento.

Entonces, esto es lo que vamos a hacer en esta sección vamos a crear esos eventos. Nos dirigimos hacia el `CalendarPage.jsx` y nos crearemos tres eventos.

> sucede que, algunos eventos están con on, otros no, y es un poco curioso que no se hayan puesto de acuerdo, pero bueno, eso es problema de ellos.

`CalendarPage.jsx
```jsx
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, Navbar } from "../";
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

  // creamos los 3 eventos desde acá
  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
  }

  const onViewChange = ( event ) => {
    console.log({ viewChanged: event })
  }

  // tenemos que conectarlas, cuando algo suceda en el calendario

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

        // colocar los eventos acá
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

    </>
  )
}
```
Vamos a el navegador web, podemos ver que cuando cambiamos de vista, aparece en consola, mes, y van a ver que aquí dice month, semana, día, y agenda. Eso mismo es lo que yo necesito para por defecto manejar eventos.

## Colocando por default eventos
Colocamos en nuestro componente de Calendar que tenemos dentro de CalendarPage este evento, debajo de los que colocamos anteriormente `defaultView='agenda'`, y podríamos ver que al recargar la página en el navegador, este nos muestra por defecto la vista en la agenda.

Ahora, lo que haremos es que, cuando la vista cambia `onViewChange` yo voy a almacenar esto en el localStorage y almacenar en el local storage me va a permitir a mí que, a la hora de que se recargue el navegador web puede establecerlo, voy a tener que hacer unas modificaciones...

```jsx
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';

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

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'agenda');
  /**en useState el valor que va a tener por defecto vamos a buscar el local storage luego get item lastView
   * estamos obteniendo y esto puede ser null específicamente cuando se carga la primera vez 
   * si no se tiene nada dejemos la vista en agenda, sino tenemos un valor en getItem entonces lo mandamos a agenda */
   //lastView es el que podemos utilizar en lugar de colocar por default agenda

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
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
  }

  const onViewChange = ( event ) => {
    // entonces acá, lo que haremos primero es llamar el localStorage
    localStorage.setItem('lastView', event );// event es mes, día, semana, etc...
    
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
        defaultView={ lastView }// en lugar de colocar 'agenda'
      />

    </>
  )
}
```

Vamos en el navegador a la parte de application en nuestro localStorage, deberíamos de tener ahí lastView en “month” si es que ahí estamos, o donde sea que estemos. Si yo recargo se queda en donde estábamos. Genial, esto funciona bien.

Y quedaremos en este punto, tenemos la interacción necesaria por el momento, seguiremos en la siguiente sección trabajando más de nuestro calendario.