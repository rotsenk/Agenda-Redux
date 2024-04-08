# Obtener la información del formulario del evento
En esta sección, realizaremos que nosotros tomemos los valores del formulario, vamos a tomarlos y a crear nuevo evento, con la excepción del ID, porque el ID se extrae del backend, pero vamos a ver cómo jugamos con eso.
Vamos a preparar el formulario para enviarlo, y así.
También, debemos ir pensando que pronto vamos a necesitar el estado global.

Nos dirijimos hacia `CalendarModal.jsx` y vamos a manejar el posteo del formulario.

``` jsx
import { useState } from 'react';
import { addHours } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import es from 'date-fns/locale/es';

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

    const [ isOpen, setIsOpen ] = useState(true);

    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });

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
        console.log('Cerrando Modal');

        setIsOpen( false );
    }

    // crear onSubmit, donde recibimos el evento
    const onSubmit = (event) => {
        // detener la propagación
        event.preventDefault();
    }// este onSubmit lo vamos a colocar en el formulario en la propiedad onSubmit a la par del className del form

    return(
        <Modal
            isOpen={ isOpen }
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
                        className="form-control"
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

Con esto, ya cuando presionamos el botón de Guardar, no debería hacer el refresh completo nuestro navegador.

## Validar la función onSubmit
Haremos un par de validaciones en esta función

```jsx
import { useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import es from 'date-fns/locale/es';

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

    const [ isOpen, setIsOpen ] = useState(true);

    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });

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
        console.log('Cerrando Modal');

        setIsOpen( false );
    }

    const onSubmit = (event) => {
        // detener la propagación
        event.preventDefault();

        // No deberíamos permitir que la fecha inicial sea menor a la fecha final. la fecha final siempre debe ser mayor
        const difference = differenceInSeconds( formValues.end, formValues.start );
        console.log({ difference });// podemos ver que hay una diferencia de 7200 segundos

    }// este onSubmit lo vamos a colocar en el formulario en la propiedad onSubmit a la par del className del form

    return(
        <Modal
            isOpen={ isOpen }
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
                        className="form-control"
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

En este caso, al ver en la consola, existe una diferencia de 7200 segundos, y está bien, pero si yo cambio en la hora y fecha, pongo que la fecha final es menor y presiono guardar, esto me indica segundos en Negativo, si es negativo, significaría que la fecha de finalización es mayor, así que no debo permitir esto.

Otra cosa, es que si yo borro una de las fechas y horas y lo guardo, me indica que NaN, tendríamos que hacer unos cambios y condiciones.

```jsx
import { useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import es from 'date-fns/locale/es';

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

    const [ isOpen, setIsOpen ] = useState(true);

    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });

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
        console.log('Cerrando Modal');

        setIsOpen( false );
    }

    const onSubmit = (event) => {

        event.preventDefault();

        const difference = differenceInSeconds( formValues.end, formValues.start );
        console.log({ difference });

        // si esto No es un Numero (NaN), o es <= a cero voy a indicar un mensaje y return es para que se detenga la ejecución
        if ( isNaN(difference) || difference <= 0 ) {
            console.log('Error en las fechas');
            return;
        }

        // obligar que tenga el titulo del evento
        if ( formValues.title.length <= 0 ) {
            return;
        }

        // caso contrario, entonces retornamos formValues
        console.log(formValues); // esta consola sólo a modo de práctica

        // Cosas que hace falta hacer:
        /** Cerrar Modal
         * Remover errores en pantalla
         */

    }

    return(
        <Modal
            isOpen={ isOpen }
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
                        className="form-control"
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

Ahora podemos ver las condicionales que hemos hecho, si cumplen en consola los mensajes que hemos enviado, y podemos ver que sí, probemos guardando info correcta, y luego hagamos cambios para ver si se cumplen las condicionales. Hasta este punto estamos bien.

Ahora tendríamos que hacer que la cajita de título si no se guarda texto, se ponga en color rojo y notifique la validación, esto sería lo último básicamente para luego implementar la parte de Redux. Con redux manejo si hago doble clic, botones de nueva nota en blanco y así.

## Validaciones visuales
En esta sección, agregaremos validaciones visuales, dependiendo del tipo de condición.

Haremos la instalación de sweetalert2: https://sweetalert2.github.io/  usando el comando: `npm install sweetalert2`, esta herramienta SweetAlert2 es una herramienta útil para mejorar la experiencia del usuario al proporcionar mensajes claros y atractivos en tu aplicación web.

Luego de instalarlo, vamos a utilizarlo en la funcion de *onSubmit* 
```jsx
const onSubmit = (event) => {

        event.preventDefault();

        const difference = differenceInSeconds( formValues.end, formValues.start );
        console.log({ difference });

        if ( isNaN(difference) || difference <= 0 ) {
            // título del mensaje, descripción del mensaje, ícono del mensaje
            Swal.fire('Fechas incorrectas', 'Revisas fechas ingresadas', 'error');
            return;
        }

        if ( formValues.title.length <= 0 ) {
            return;
        }

        console.log(formValues);

        // Cosas que hace falta hacer:
        /** Cerrar Modal
         * Remover errores en pantalla
         */

    }
```

Ahora podemos ver que sí funciona, pero tenemos que modificar también otras cosas. Haremos la parte del título. Ahora yo sólo necesito que sólo se muestre el error cuando la persona intenta hacer el submit del formulario y resulte que el título estaba incorrecto, entonces deberemos crear un nuevo estado.

Modificamos en la función de `CalendarModal` 
```jsx
export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState(true);
    // crear un nuevo estado
    const [ formSubmitted, setFormSubmitted ] = useState(false);// iniciamos en falso
    // este nuevo estado, yo voy a modificar cuando la persona intente hacer submit
    // modifiquemos en onSubmit

    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }
```

luego en la función de `onSubmit`
```jsx
    const onSubmit = (event) => {

        event.preventDefault();
        setFormSubmitted(true); // hacer el posteo le diré que true

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
```

Ahora, yo necesito que las cajitas cambien sus clases en colores, para las validaciones, vamos a hacer una variable que nos permita controlar eso.
`useMemo ( () => {}, [] )`

```jsx
import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2'; // Importar SweetAlert2


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

    const [ isOpen, setIsOpen ] = useState(true);
    // crear un nuevo estado
    const [ formSubmitted, setFormSubmitted ] = useState(false);// iniciamos en falso
    // este nuevo estado, yo voy a modificar cuando la persona intente hacer submit
    // modifiquemos en onSubmit

    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),
    });

    // usamos el useMemo y lo importamos
    // tendremos dos dependencias en el arreglo, para que se memorice el valor
    // en este caso, se memoriza si el título cambia o formSubmitted cambia
    // creamos la clase titleClass que es la que le voy a colocar al input
    const titleClass = useMemo (() => {
        // si el formulario no se ha disparado, entonces voy a regresar un string vacío a la clase
        if( !formSubmitted ) return '';

        // ahora, si ya se hizo el posteo del formulario y si no ha ingresado titulo, muestro error
        return ( formValues.title.length > 0 )
        ? 'is-valid'
        : 'is-invalid'


    }, [ formValues.title, formSubmitted ])
    // este titleClass lo vamos a colocar en el input de título y notas en el formulario

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
        console.log('Cerrando Modal');

        setIsOpen( false );
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
            isOpen={ isOpen }
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

Con esto, al dar al botón de guardar, podemos ver que los cambios se han hecho. 
Realmente la clase 'is-valid' no es importante que aparezca, porque no sería útil en un formulario funcional. Pero para que se vieran reflejados los cambios se hizo, y la puedo modificar.

Hasta este punto nos podemos poner a reflexionar, hay mucha lógica en el componente del CalendarModal, crecería un poquito más. Pensemos si el código está limpio para poder dejarlo así, o necesitaríamos crear un custom hook. Eso pues, quedaría a su discreción, para que sea más fácil de entender.

Por ahora lo dejaremos hasta acá, porque en la próxima sección empezaremos a trabajar con nuestro store, porque ocupamos hacer interacciones con nuestros elementos, y necesitaremos un gestor de estados. Trabajaremos con Redux.