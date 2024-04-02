# Datepicker en español
En esta sección haremos dos cosas:

1. Ponerlo el datepicker en español.
2. Que me permita a mí cambiar la hora, hacerlo mediante el editor y que todo esté en español.

Nos dirigimos hacia `CalendarModal.jsx` y en el Datepicker, necesitamos agregar una nueva propiedad `ShowTimeSelect` 

para el idiona, revisamos la documentación: https://www.npmjs.com/package/react-datepicker, en la parte de Localization, y vamos a hacer unas importaciones para que funcione.

```jsx
import { useState } from 'react';
import { addHours } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; // importar registerLocale 
import 'react-datepicker/dist/react-datepicker.css'; 
import es from 'date-fns/locale/es';// importar el idioma español

// mandar el idioma en español
registerLocale ( 'es', es );

// luego, colocamos una propiedad más en el Datepicker

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
                        selected={ formValues.start }
                        className='form-control'
                        onChange={ (event) => onDateChanged(event, 'start') }
                        dateFormat='Pp'

                        showTimeSelect // propiedad para seleccionar el tiempo
                        locale='es' // definir el idioma
                        timeCaption='Hora' // enviar manualmente el caption para time
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

                        showTimeSelect // propiedad para seleccionar el tiempo
                        locale='es' // definir el idioma
                        timeCaption='Hora' // enviar manualmente el caption para time
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

Por ahora eso es todo por hacer en esta sección. La próxima, al tocar botón de guardar nosotros ocupamos tomar todos los valores y prepararlos para crear una nueva nota cerrar el modal y hay muchas cosas más que hacer por aquí, pero nuestra aplicación ya está tomando forma. 
