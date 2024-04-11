# Cargar un evento en el Modal

Lo que quiero que vemos en esta sección, es que al hacer doble Clic tengamos la nota activa en lugar que diga mi nombre, o que diga lo del cumpleaños y si hay alguna descripción o notas, también que carguemos las fechas, vamos a tener que hacer va a ser tomar esa información y colocarla simplemente en el formulario que ya habíamos establecido.

Nos dirigimos a `calendarSlice.js`
```jsx
...
// todas las notas deberían tener un _id
// este manejará un id único por cada nota que guardemos
// idealmente debería venir del backend, pero no estamos trabajando con backend
const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del team leader',
    notes: 'Comprar una taza de spiderman pequeño',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Nestor'
    }
};
...
```

Cuando yo hago Clic en una nota, yo quiero que se active esa nota en *activeEvent*, tenemos que ir a hacer una modificación en el `calendarSlice.js`, en la parte de los reducers.

```js
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del team leader',
    notes: 'Comprar una taza de spiderman pequeño',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Nestor'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null 
    },
    reducers: {
        // de la action extraemos el payload, ya sea que podemos mandat toda la nota o sólo el id
        //tratemos de manejar esto lo más homogéneo posible
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload; // lo que sea que le mande, se va a activar
        },
    }

})

export const { onSetActiveEvent } = calendarSlice.actions;
```

Ahora todo estoy listo para ser consumido, entonces vámonos a nuestro `useCalendarStore.js` ahí vamos a ocupar también crear algún tipo de funcionalidad que nos permita llamar fácilmente y hacer el dispatch fácilmente de esa acción.

```js
import { useDispatch, useSelector } from 'react-redux'; // importar useDispatch
import { onSetActiveEvent } from '../store'; // importar onSetActiveEvent

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );

    // creamos la constante
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }// este es mi primer método que voy a exponer

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
        setActiveEvent
    }
}
```

En teoría, esto ya está.
Ahora mofiquemos algunas cosas en `CalendarPage.jsx`
```jsx
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';// importar useCalendarStore



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();

  // ahora vamos a tomar el setter del evento activo
  const { events, setActiveEvent } = useCalendarStore();
  // y cuando hacemos clic en onSelect, este sería el evento que le tengo que mandar a la función

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
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChange = ( event ) => {

    localStorage.setItem('lastView', event );
    setLastView( event ); // colocar setLastView que no lo habíamos colocado
    
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

Ahora, verificamos en el navegador, abrimos la parte de *redux*, abrimos *calendar*, y con sólo hacer un clic, debería de activarse, y aparecer el id y todo el objeto del evento en el calendario.

Si hago doble clic, se abre, pero no está cargado, pero se puede ver que está la nota activa.

Bien, entonces, ahora podemos ir a hacer la implementación respectiva en el `CalendarModal.jsx`, lo que tenemos que hacer es que cuando cambie la nota activa ahí tenemos que cambiar los valores del formulario (formValues) para activarlos y hacer los cambios respectivos, vamos a utilizar un *useEffect*:
`useEffect(() => { }, [])`

```jsx
import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';// importar useCalendarStore


// mandar el idioma en español
registerLocale ( 'es', es );

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

    const { isDateModalOpen, closeDateModal } = useUiStore();

    // extraer las dependencias que nos interesan desde useCalendarStore
    const { activeEvent } = useCalendarStore();

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });

    const titleClass = useMemo (() => {

        if( !formSubmitted ) return '';

        return ( formValues.title.length > 0 )
        ? 'is-valid'
        : 'is-invalid'


    }, [ formValues.title, formSubmitted ])

    // creamos el useEffect
    // Necesitaremos las dependencias que van en el array desde useCalendarStore
    // este efecto se va a estr disparando cada vez que activeEvent cambie
    useEffect(() => {
        // como hay un punto en el cuál activeEvent es nulo
        if( activeEvent !== null ){
            setFormValues({ ...activeEvent });
        }

    }, [ activeEvent ])

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }

    const onDateChanged = ( event, changing) => {
        setFormValues({
            ...formValues,
            [ changing ]: event
        })
    }

    const onCloseModal = () => {
        // colocamos aquí la función para cerrar modal
        closeDateModal();

    }

    const onSubmit = (event) => {

        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( formValues.end, formValues.start );
        console.log({ difference });

        if ( isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisas fechas ingresadas', 'error');
            return;
        }

        if ( formValues.title.length <= 0 ) {
            return;
        }

        console.log(formValues);
    }

    return(
        <Modal
            isOpen={ isDateModalOpen }// viene del custom hook
            onRequestClose={ onCloseModal }
            style={customStyles}
            className='modal' 
            overlayClassName='modal-fondo' 
            closeTimeoutMS={ 200 } 
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={ formValues.start }
                        className='form-control'
                        onChange={ (event) => onDateChanged(event, 'start') }
                        dateFormat='Pp'

                        showTimeSelect 
                        locale='es' 
                        timeCaption='Hora' 
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        className='form-control'
                        onChange={ (event) => onDateChanged(event, 'end') }
                        dateFormat='Pp'

                        showTimeSelect 
                        locale='es' 
                        timeCaption='Hora' 
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass } `} // modificamos
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"

                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"

                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
```

Nos vamos al navegador. Al hacer doble Clic ahora en el cuadrito del evento en el calendario, dice "Cumpleaños del team leader" y "Comprar una taza de spiderman pequeño" y las respectivas fechas bien que interesante no dice Nestor Rivas, cierro y vuelvo a abrir y ahí tenemos la información.

Ahora hay que crearse otra nota y esto no lo está actualizando aún, no está actualizando ningún lugar todavía no hemos hecho eso pero por lo menos cuando hacemos doble clic, ahí aparece agregado.

Dejémoslo hasta este punto, en la siguiente sección trabajaremos en la creación de nuevos eventos.

En teoría, ya podemos dejar sin *title* y sin *notes*, en nuestro *useState* de formValues en el Componente `CalendarModal.jsx`

```jsx
...
const [ formValues, setFormValues ] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });
...
```