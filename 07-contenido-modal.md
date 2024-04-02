# Contenido del Modal
En esta sección, trabajaremos con el contenido que vamos a colocar en el modal
react date picker: https://www.npmjs.com/package/react-datepicker 
que nos va a servir para colocar una caja de texto en la cual hacemos Clic y nos aparece el selector de fechas y también nos va a permitir seleccionar horas, que es útil.

vamos a utilizar este código, que es simplemente para acelerar el proceso de crear el formulario, porque no hay nada nada que tenga que ver react acá, es puro html.
https://gist.github.com/Klerith/8c9b2178830045b3f5126422bd0223e1

```jsx
<h1> Nuevo evento </h1>
<hr />
<form className="container">

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <input className="form-control" placeholder="Fecha inicio" />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <input className="form-control" placeholder="Fecha inicio" />
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
```

Nos dirigimos a `CalendarModal.jsx` y debajo de donde se renderiza `<Modal />` en lugar del h1 y todo lo demás que teníamos en el modal, vamos a reemplazar por el código anteriormente proporcionado.

Luego, verificamos el navegador web, es un formulario común y corriente. Que por ahora no hace nada.

## Instalar date picker
Instalar el paquete: `npm install react-datepicker --save`, vamos a hacer la instalación dentro de nuestra aplicación para poder hacer uso de los componentes en formatos de fecha y demás.

Una vez instalado, podemos seguir viendo la documentación.

Nos vamos nuevamente a `CalendarModal.jsx` y modificamos, para poder editar los valores del formulario...
```jsx
import { useState } from 'react';// importar useState
import { addHours } from 'date-fns';// importar addHours
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

    // crear un useState
    // el formulario va a lucir como le indiquemos en el objeto del estado
    const [ formValues, setFormValues ] = useState({
        title: 'Nestor',
        notes: 'Rivas',
        start: new Date(),
        end: addHours ( new Date(), 2 ),// le añadimos dos horas a esta fecha
    });

    // realizamos lo que modifique el estado
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })// simplemente actualizamos el valor que viene en las propiedades del objeto
    }

    // con esto tenemos lo minimo necesario, ahora bajamos hacia nuestro form y modificamos

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
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <input className="form-control" placeholder="Fecha inicio" />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <input className="form-control" placeholder="Fecha inicio" />
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

                        value={ formValues.title }// estos values agregamos
                        onChange={ onInputChanged }// aquí el onChange para que modifique
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

                        value={ formValues.notes }// estos values agregamos
                        onChange={ onInputChanged }// aquí el onChange para que modifique
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

Ahora, ya podemos cambiar valores del titulo y descripción, podemos proceder a modificar con el *datepicker*, y en lugar de donde tenemos los inputs, es que usaremos el datepicker...
```jsx
import { useState } from 'react';
import { addHours } from 'date-fns';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'; // importamos el datepicker
import 'react-datepicker/dist/react-datepicker.css'; // importar los estilos

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

    // crear un useState
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

    // creamos algo que nos modifique la fecha, el start o el end
    const onDateChanged = ( event, changing) => {
        setFormValues({
            ...formValues,
            [ changing ]: event
        })
    }// este me sirve para cambiar tanto la caja de texto del end como del starr

    const onCloseModal = () => {
        console.log('Cerrando Modal');

        setIsOpen( false );
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
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={ formValues.start } // fecha seleccionada
                        className='form-control' // clase de boostrap
                        onChange={ (event) => onDateChanged(event, 'start') }// para hacer el cambio, este emite el onChange
                        dateFormat='Pp'// para que aparezca la hora
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={ formValues.start }// para que no seleccione una fecha inferior a la fecha de inicio
                        selected={ formValues.end } // fecha seleccionada
                        className='form-control' // clase de boostrap
                        onChange={ (event) => onDateChanged(event, 'end') }// para hacer el cambio, este emite el onChange
                        dateFormat='Pp'// para que aparezca la hora
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

Ahora con esto, ya podemos seleccionar fechas, modificar input del título y textarea para la descripción, por ahora dejémoslo hasta aquí, y nos vemos en la siguiente sección en donde vamos a terminar de personalizar nuestro nuestro calendario y a nuestra fecha de calendario nos falta también poder cambiar la hora, asimismo, colocar en español.