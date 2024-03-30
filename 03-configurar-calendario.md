# Configuraciones adicionales al calendario

En esta sección cambiaremos algunas cosas. Limpiaremos un poco el código.
Lo primero que yo quiero hacer es quitar todas estas importaciones qué me sirven para hacer nuestro localizer dentro de `CalendarPage.jsx`

Vamos a hacer un helper que nos ayude a limpiar nuestro `CalendarPage.jsx` crearemos en `/src`una nueva carpeta que se llame `/helpers` crearemos nuestro archivo barril `index.js`

Dentro de `index.js`
```jsx
export * from './calendarLocalizer'
```

y dentro de esa misma carpeta `/helpers`, también un nuevo archivo que se llame `calendarLocalizer.js`
```jsx
//todo lo que contendrá este archivo, es lo que tenemos en las importaciones de CalendarPage.jsx
import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import esES from "date-fns/locale/es"; //cambio a idioma español

const locales = {
  es: esES,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

```
Ahora, usaremos culture como propiedad del Calendario, para que detecte el idioma español en algunos elementos, entonces `CalendarPage.jsx` se mira así:
```jsx
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';// acá solo necesito este, que incluso, se eliminará después 
import { Navbar } from "../";
import { localizer } from '../../helpers';


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
      />

    </>
  )
}
```

Vamos a crear otro helper dentro de nuestra carpeta `/helpers`, yo tengo mis helpers como funciones que están desacopladas por si acaso en el día de mañana necesito tomarlas las tomo y ya está.
Creamos un nuevo archivo llamado `getMessages.js` y colocamos lo siguiente:

```jsx
export const getMessagesES = () => {
    return {
        allDay: 'Todo el día',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: total => `+ Ver más (${total})`
    }
}
```

Aquí podemos integrar más idiomas, si deseamos, pero por el momento está bien así.
Ahora, nuestro archivo barril `index.js` de nuestra `/helpers` se vería así:
```jsx
export * from './calendarLocalizer';
export * from './getMessages';
``` 

Ahora, nuestros mensajes los tenemos que importar dentro de `CalendarPage.jsx`, y hacemos un par de modificaciones (ver en comentarios):
```jsx
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers'; // importamos getMessagesES


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
        messages={ getMessagesES() }//llamamos aquí, la función
      />

    </>
  )
}
```

## Eventos en el Calendario
Cómo es que funcionan los eventos en el calendario, crearemos algunos...
Ver en los comentarios, las modificaciones del código de `CalendarPage.jsx`
```jsx
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
  // crearemos una función por aquí, con los argumentos que recibiremos
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log({ event, start, end, isSelected });//depende de lo que arrojemos acá, podemos hacer cambios
    //un análisis de lo que necesitamos, por ejemplo:
    /**Tenemos la fecha de inicio
     * fecha fin
     * tenemos isSelected si se selecciono en true o no en falso
     * titulo
     * colores, etc*/
    //podemos tomar muchas decisiones dependiendo de lo que devuelva

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
```

Con las modificaciones para los eventos que sucedan dentro del calendario:
```jsx
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
```

Por ahora eso es todo en esta sección, ya tenemos nuestro primer evento del calendario, reducimos bastante el código que teníamos aquí en eso el `CalendarPage.jsx`, eventualmente ustedes también pueden crearse un custom hook para extraer la lógica y que no se encuentre todo en el `CalendarPage.jsx` pero vamos a ir un paso a la vez.