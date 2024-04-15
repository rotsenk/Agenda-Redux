# Redux serializableCheck
En JS no deberíamos enviar la fecha exactamente la fecha, sino trabajarla como un número y con el número procesar estos datos.
Nos vamos al `store.js` y hacemos unas modificaciones...

```jsx
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer, // colocamos el calendarSlice
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false // esto es solo para que esas fechas no revise si las puede serializar
    })
})

```

El middleware es una función que se ejecuta entre el envío de una acción y el momento en que la acción alcanza el reducer en Redux. Se utiliza para realizar tareas como el registro de acciones, el manejo de acciones asíncronas o la transformación de acciones antes de que lleguen al reducer.

En el código proporcionado, se está utilizando una función llamada getDefaultMiddleWare para obtener un conjunto predeterminado de middleware de Redux Toolkit.

Dentro de esta función, se está pasando un objeto de configuración como argumento a *getDefaultMiddleWare*. Dentro de este objeto, hay una propiedad llamada *serializableCheck* que se establece en false. Esto significa que se está desactivando la comprobación de serialización que Redux Toolkit realiza por defecto para garantizar que las acciones enviadas sean serializables.

La desactivación de esta comprobación es útil en situaciones donde las acciones contienen datos no serializables, como objetos con fechas, y no queremos que Redux Toolkit emita advertencias o errores por ello. Sin embargo, desactivar esta comprobación puede tener implicaciones en la depuración y la integridad de los datos en la aplicación, por lo que debe usarse con precaución.

Ahora nos vamos al navegador y ya no tendríamos ese error. Podemos crear nuevos, eliminar y así.

