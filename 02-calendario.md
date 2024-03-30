# Calendario
En esta sección, crearemos un calendario de pantalla completa.

Utilizaremos react big calendar: https://www.npmjs.com/package/react-big-calendar

el único inconveniente que tiene es que internamente no está escrito en typescript por eso tenemos que solo tenemos los archivos de definición o que estamos trabajando. 
otra cosa es que este calendario en la versión 18 ya empezó a alertar cierta funcionalidad que debe de ser actualizada propiamente del calendario, esto se supone que fue resuelto entonces ya vamos a poder habilitar el modo estricto de React.

Hacemos la instalación: `npm i react-big-calendar`

Vamos a utilizar *date-fns v2* por la cuestión del idioma, nos ofrece objetos de tipo fecha.
Instalamos el paquete: `npm install date-fns --save`

## Configurar `CalendarPage.jsx`

```jsx
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';// me sirve para poner el idioma que necesito

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

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

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ myEventsList }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

    </>
  )
}
```
Si nosotros guardamos cambios, tendremos errores porque no va a econtrar eso de "myEventList", procedemos a modificar siempre el `CalendarPage.jsx`

```jsx
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import enUS from 'date-fns/locale/en-US';

import { addHours, format, parse, startOfWeek, getDay } from 'date-fns';//aquí puedo importar los demás
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
        style={{ height: 500 }}
      />

    </>
  )
}
```

Con esto ya tendríamos nuestro calendario, se vería feo porque no tenemos estilos xd, pero debemos importar una ruta que nos dice el sitio oficial del paquete.
Justo debajo de la importación de "react-big-calendar", importamos lo siguiente: 
`import 'react-big-calendar/lib/css/react-big-calendar.css';` 

Ahora sí, nuestro calendario tiene estilos! :D

Aunque pordíamos modificar el height, que lo calcule basado en el 100% del vh (vertical height) y le resta unos 80 pixels los cambios voy a regresar navegador web y mi calendario queda perfecto.

```jsx
    <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
    />
``` 

Listo, con esto hemos terminado esta sección, en la próxima seguiremos configurando