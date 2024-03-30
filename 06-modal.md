# Modal
En esta sección, crearemos un modal sobre el calendario

Quiero que mostremos un modal, podríamos usar los modals de Bootstrap, pero quiero que sea algo no tan apegado a un framework o no usar el el modal de Bootstrap, porque también hay muchas clases y cosas que genera.

Entonces voy a crearme un modal por mi propia cuenta utilizando paquete bien sencillo de de NPM, entonces quiero un modal que me sirva a mí para mostrar un formulario, seleccionar o editar las fechas y todo eso.

https://www.npmjs.com/package/react-modal

Vamos a instalar este paquete, que solo tiene una dependencia, no pesa mucho, es muy popular. Se pueden dirigir a los ejemplos y ver los modals, son básicos, pero son los que necesitamos.

hacemos `npm i react-modal` y listo.

## Configurar modal
Necesitamos configurar ciertas cosas del modal, es un *Higher Order Component* es decir un Componente de Alto Orden (o de Orden Superior)

Dentro de la carpeta `/components` en `/calendar` voy a crear un Componente llamado `CalendarModal.jsx` 
```jsx
import Modal from 'react-modal';// importamos del react modal

// se nos pide que hagamos la configuración de customStyles
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

// asegurarse de añadir al root de nuestra aplicación, se obtiene del html, lo que contiene a la aplicación
Modal.setAppElement('#root');// ayuda a que se pueda sobreponer ante todo

export const CalendarModal = () => {
    // función que se dispara cuando llamamos a cerrar modal
    const onCloseModal = () => {
        console.log('Cerrando Modal');// sólo para verificar fincionalidad
    }

    return(
        <Modal
            isOpen={ true }
            onRequestClose={ onCloseModal }
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1>Hola Mundooo</h1>
            <hr />
            <p>Párrafo desde el modal...</p>

        </Modal>
    )
}
```

Luego, lo exportamos en nuestro archivo de barril `index.js` que se encuent en `/calendar` al nivel de `/components` y `/pages`, y ordenamos las exportaciones en orden alfabético
```js

export * from './components/CalendarEvent';
export * from './components/CalendarModal';
export * from './pages/CalendarPage';

export * from './components/Navbar';

```

Ahora, lo vamos a renderizar en `CalendarPage.jsx`
```jsx
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from "../";// importamos CalendarModal
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
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
  }

  const onViewChange = ( event ) => {

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
        defaultView={ lastView }
      />

       {/* colocamos CalendarModal antes de que se cierre */}
       <CalendarModal />

    </>
  )
}
```

Si vamos al navegador, veremos que ahí se presenta nuestro modal, y que si damos clic, muestra el mensaje de "cerrando modal", al menos se dispara. 

## Controlar esto mediante un useState
Por el momento manejaremos el estado del modal, mediante useState, nos vamos hacia `/CalendarModal.jsx`
```jsx
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    // estado del modal
    const [ isOpen, setIsOpen ] = useState(true);// inicializamos el estado en verdadero

    const onCloseModal = () => {
        console.log('Cerrando Modal');
        // aquí modificamos con el setter, haciendo clic afuera de este
        setIsOpen( false );
    }

    return(
        <Modal
            isOpen={ isOpen }// colocamos la variable del estado aquí
            onRequestClose={ onCloseModal }
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1>Hola Mundooo</h1>
            <hr />
            <p>Párrafo desde el modal...</p>

        </Modal>
    )
}
```

Al ver esto, en el navegador, no tiene estilos ni nada, y yo quisiera mejorar eso, podemos utilizar estos estilos, en los estilos globales `styles.css`
```css
/* Modal */
.ReactModalPortal > div{
    opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
    align-items: center;
    display: flex;
    justify-content: center;
    transition: opacity .2s ease-in-out;
    z-index: 999;
}

.modal-fondo {
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
}

.ReactModalPortal .ReactModal__Overlay--after-open {
    opacity: 1;
}

.ReactModalPortal .ReactModal__Overlay--before-close {
    opacity: 0;
}

.modal {
    background: white;
    border-radius: 5px;
    color: rgb(51, 51, 51);
    display: inline;
    max-height: 620px;
    max-width: 500px;
    outline: none;
    padding: 10px;
}
```

Ahora, pudimos notar en el navegador, que la entrada este modal la hace con una transición, se mira bien, pero todavía falta que definir algunas clases en el `CalendarModal.jsx` 

```jsx
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState(true);

    const onCloseModal = () => {
        console.log('Cerrando Modal');

        setIsOpen( false );
    }

    return(
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className='modal' // así se llama la clase en el css
            overlayClassName='modal-fondo' // clase de css
            closeTimeoutMS={ 200 } // tiempo en milisegundos
        >
            <h1>Hola Mundooo</h1>
            <hr />
            <p>Párrafo desde el modal...</p>

        </Modal>
    )
}
```

Ahora, podemos notar la diferencia. Se ve mucho mejor, y muy sencillo ya tenemos nuestro modal implementado.

Muy sencillo, ya tenemos nuestro modal implementado, vamos a dejarlo así, y en la próxima sección, nosotros lo que vamos a terminar haciendo es que el isOpen alguna función que nos permite a nosotros poder abrir y cerrar el modal a nuestra voluntad y no tener la dependencia directamente en el calendario y también que el calendario por sí mismo sepa o el modal sepa cuando abrirse y cuando cerrarse y no tener que mandarle properties ni nada de eso para eso vamos a usar nuestro store.
Por ahora, dejémoslo así seguimos en la próxima sección...