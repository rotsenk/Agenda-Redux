# CalendarSlice

Con el store crearemos los eventos del calendario, eventos cargados, activos, etc.

Creamos un archivo dentro de la carpeta `/calendar` pero la que está dentro de `/store`, un archivo llamado `calendarSlice.js`

```jsx

import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [], // definimos los eventos, que serán un arreglo de un tipo de objeto
        activeEvent: null // por defecto nulo
    },// así es como luce nuestro estado
    reducers: {
        increment: (state, /**action */) => {
            state.counter += 1;
        },
    }

})

export const { increment } = calendarSlice.actions;


```
Por ahorita lo podemos dejar así, aunque no funcione.

Luego, lo exportamos en el archivo de barril `index.js` que se encuentra en `/store`
```jsx

export * from './calendar/calendarSlice';

export * from './ui/uiSlice';

export * from './store';

```

Luego lo importamos en el `store.js` y lo importamos el `calendarSlice`

```jsx
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './'; // importamos calendarSlice

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer, // colocamos el calendarSlice
        ui: uiSlice.reducer
    }
})
```

Ahora nos vamos hacia `/CalendarPage.jsx` y verificamos la parte de donde sacamos los eventos, y los eliminamos, porque los eventos ahora ya deberían llegar desde el `store` 
```jsx
// ! e l i m i n a r 
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
```

Ahora, modificamos un poco en `calendarSlice.js`
```js
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns'; // importar addHours

// colocar los eventos temporalmente acá
// porque estos eventos deben llegar desde el backend
const tempEvent = {
    title: 'Cumpleaños del team leader',
    notes: 'Comprar una taza de spiderman pequeño',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Nestor'
    }
};// pasamos este como primer evento en events del initialState

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null 
    },
    reducers: {
        increment: (state, /**action */) => {
            state.counter += 1;
        },
    }

})

export const { increment } = calendarSlice.actions;

```

Ahora necesitamos que para que disparen acciones y demás, vamos a crear un custom hook, entonces en la carpeta de `/hooks` vamos a crear uno que se llama `useCalendarStore.js`, este será el encargado de cualquier interacción que hagamos con el *store* y así tenemos entrelazada la lógica, los demás componentes sólo van a llamar las funciones o las propiedades que este custom hook exporte

```js
import { useSelector } from 'react-redux';

export const useCalendarStore = () => {
    // 1. tomaremos los eventos que tenemos en calendarSlice
    // esto viene del navegador cuando revisamos redux
    const { events, activeEvent } = useSelector( state => state.calendar );

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
    }
}
```

Ahora, en el archivo de barril de los `/hook` vamos a exportar 
```js


export * from './useCalendarStore';
export * from './useUiStore';

```

Ahora, vamos a `CalendarPage.jsx` y vamos a usar nuestro custom hook, ver en comentarios las modificaciones
```jsx
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';// importar useCalendarStore



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();

  // destructuramos lo que viene de useCalendarStore
  const { events } = useCalendarStore();// con esto ya tenemos acceso a los eventos

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
    console.log({ click: event });
  }

  const onViewChange = ( event ) => {

    localStorage.setItem('lastView', event );
    
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

    </>
  )
}
```

El custom hook nos funciona muy bien, cuando queramos crear funciones y demás, tengamos que hacer dispatch, las crearemos dentro del mismo, que nos sirvan a nosotros para hacer los dispatch, por si sucede un cambio, simplemente hacemos el cambio en el custom hook, o rara ocasión en el store.

En la próxima sección, vamos a trabajar los reducers que el Calendar Slice necesita, porque claramente el que tenemos ahorita no es.