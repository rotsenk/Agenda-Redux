# Personalizar cuadro de evento
En esa sección, lo que quiero hacer es que personalicemos el cuadrito del evento que pintamos anteriormente, que la idea va a ser que podamos añadir información referente al usuario que lo creó, el mensaje, y en general tener más control sobre cómo se construye.

Como esto es algo relacionado a la parte de `/calendario` voy a crear un nuevo componente el cual me va a servir a mí para trabajar ese cuadrito, creamos un nuevo archivo dentro de `/components` que sea llamado `CalendarEvent.jsx` 

```jsx
// Este componente va a recibir varias props

export const CalendarEvent = (props) => {
    console.log(props)

    return(
        <div>CalendarEvent</div>
    )
}
```

lo exportamos también en nuestro archivo barril `index.js`
```js

export * from './components/Navbar';

export * from './components/CalendarEvent';

export * from './pages/CalendarPage';

```

Ahora utilizaremos este `CalendarEvent.jsx` dentro de nuestro `CalendarPage.jsx`

```jsx
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, Navbar } from "../";// importar CalendarEvent
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

    //console.log({ event, start, end, isSelected }); // e l i m i n a r, ya no es necesario 

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
        components={{
          event: CalendarEvent // mandamos esta referencia
        }}// especificar un objeto en el cual tendríamos los posibles componentes necesarios para sobreescribir, ej agenda, día, meses, yo quiero cambiar el evento
      />

    </>
  )
}
```
Podemos ver que en nuestro navegador ya aparece en el cuadrito algo que dice "CalendarEvent", abrimos la consola.
Podemos ver properties que están llegando a este componente por las palabras tenemos toda esta información, tenemos
- si continúa después de algún evento o está antes de algún evento 
- tenemos el evento como tal con toda su información 
- tenemos si es de todo el día 
- tenemos el localizer 
- slotEnd, slotStart
- el título

Cosas que podemos tomar del evento directamente

## Destructuring
Ahora, me dirijo hacia `CalendarEvent.jsx` y vamos a desestructurar...
```jsx
// podemos destructurar todo lo que viene del evento

export const CalendarEvent = ({ event }) => {
    // d e s t r u c t u r i n g
    const { title, user } = event;

    // titulo del evento
    // nombre del usuario que creó ese evento
    return(
        <>
            <strong>{ title }</strong>
            <span> - { user.name } </span> 
        </>
    )
}
```

Así de sencillo lo tenemos.
En la próxima clase empezaremos a definir una serie de eventos que vamos a necesitar por ejemplo:
- cuando doy click en el cuadrito del evento 
- cuando hago doble Clic en el cuadrito del evento 

y estar escuchando los mismos para poder interactuar o tener una mejor reactividad con estos eventos del calendario, pero por ahora eso era todo lo que quería hacer en esta sección, bastante sencillo la creación del mismo.