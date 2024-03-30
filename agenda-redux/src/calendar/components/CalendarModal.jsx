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