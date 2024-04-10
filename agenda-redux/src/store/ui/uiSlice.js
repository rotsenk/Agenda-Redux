// este me va a servir para mantener la información de ui
//si el modal está abierto, está cerrado, cualquier cosa que tenga que ver nuestra UI

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        //aquí creamos las acciones
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },

    }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;