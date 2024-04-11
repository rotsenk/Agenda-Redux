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