# Agregar un nuevo evento

En esta sección nos vamos a enfocar en que cuando creamos una nueva nota todavía no estamos con la actualización, cuando creamos una nueva nota y escribo algo, toco algo y toco guardar, quiero que esta nueva nota se cree y se agregue, todavía no tenemos el backend por lo cual vamos a ponerle un `_id` ficticio por ahora, pero luego será la propia respuesta del backend que me dé la información.

Tenemos que hacer la parte de qué va a hacer nuestro *store* cuando tengamos la nota creada. Vamos primero a hacer unos arreglos a los reducers, nos vamos hacia `calendarSlice.jsx` y nos creamos un nuevo reducer.

```jsx
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
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        // el payload será la nueva nota con el id, y procesada, lista para guardarse
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload); // sin redux toolkit no pudiésemos utilizar el push
            // una vez se inserta la nota, sé que tengo que cerrar el modal y limpiar la nota activa
            state.activeEvent = null; // con esto limpio el evento activo

        },
    }

})

// exportar el nuevo reducer onAddNewEvent
export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;

```

Vamos ahora, a hacer modificaciones en `useCalendarStore.jsx`, * ver en comentarios las modificaciones:

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store'; // importar onAddNewEvent

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }

    // disparar acciones síncronas, no vamos a tener thunks asíncronos
    // creamos algo parecido a los thunks
    // cuando dice la palabra start esto inicia el proceso de grabación
    const startSavingEvent = async( calendarEvent ) => {
        // idealmente esto debe llegar al backend, pero vamos a simular algo acá

        // si el calendarEvent tiene el id entonces significa que estoy actualizando
        // caso contrario, estoy creando, y si es así mandaré a llamar onAddNewevent
        if ( calendarEvent._id ) {
            // Actualizando

        } else {
            // Creando
            // le tengo que mandar el payload, este es el evento del calendario listo con su id
            // pero, este evento del calendario es uno nuevo y no tengo el id, debo ponerle algo ficticio
            // le paso todo con el spread, y luego le agrego un id, esto es simulado
            // porque en realidad el id lo debe venir del backend, y se debe remover de aca
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
            
        }
    }

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
        setActiveEvent,
        startSavingEvent, // colocar acá el startSavingEvent
    }
}
``` 

Ahora tenemos que mandarlo a llamar desde el modal, porque el modal es quien está realizando el inicio de la grabación, nos dirigimos a `CalendarModal.jsx`
* Ver en comentarios las modificaciones

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

    // llamar la función que inicia el proceso de grabación
    const { activeEvent, startSavingEvent } = useCalendarStore();
    // luego, vamos a buscar el submit

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [ formValues, setFormValues ] = useState({
        title: '',
        notes: '',
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
    useEffect(() => {

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

    // como usaremos un await dejamos que esto sea asíncrono
    const onSubmit = async(event) => {

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

        // si todo sale bien, entonces voy a mandar a llamar a startSavingEvent
        // le paso el parametro de formValues aue básicamente es mi evento del calendario
        // esperamos a que se haga la grabación con el await
        await startSavingEvent( formValues );

        // cerramos el modal
        closeDateModal();
        // una vez se graba vamos y dejamos en false porque quiero que regrese a su estado original
        setFormSubmitted(false);
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

Como pueden ver, en el navegador, si presionamos el **Fab** para crear un nuevo evento y le pasamos datos, éste se crea, y se guarda.
- Aunque se guarda en el mismo lugar que nuestro evento anterior pero es por la hora, que la ponemos en la misma hora.
- Si analizamos nuestros eventos del calendario, en la parte de redux del navegador, ahí tenemos nuesto otro evento del calendario.
- Si hago doble clic aparece todo muy bien.
- Agregamos nuevo evento y todo bien.

En teoría, esto debería ser todo para la grabación de un nuevo evento. En la próxima sección trabajaremos para editar el evento.