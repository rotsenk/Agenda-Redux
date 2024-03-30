# Configuración de Rutas
Tendremos dos rutas, porque login y registro va en una pantalla, y el calendario en otra pantalla.

- Comenzaremos creando directorios que necesitamos, dentro de `/src` haremos primeramente el directorio para manejo de la autenticación `/auth` y también algo para el manejo del calendario `/calendar` es el módulo donde tendré todos los componentes del calendario.

- Dentro de ambas carpetas, crearemos una carpeta cada una que se llamará `/pages` 

- Dentro de la carpeta de `/pages` en la autenticación, crearemos un componente llamado `LoginPage.jsx`
```jsx
export const LoginPage = () => {
    return (
        <div>
            LoginPage
        </div>
    )
}
```
- Dentro de la carpeta de `/pages` en la de calendar, crearemos un componente llamado `CalendarPage.jsx`

```jsx
export const CalendarPage = () => {
  return (
    <div>
      CalendarPage
    </div>
  )
}
```

Ya tenemos nuestros dos componentes, con dos páginas, que colocaremos como rutas.

## Rutas principales
Dentro de `/src` creamos una carpeta que se llame `/router` y dentro crearemos un componente funcional que se llame `AppRouter.jsx`

```jsx
export const AppRouter = () => {
  return (
    <div>
      AppRouter
    </div>
  )
}
```

Ahora nos dirigimos hacia `CalendarApp.jsx` porque vamos a renderizar ahí nuestro componente que tendrá las rutas

```jsx
import { AppRouter } from './router/AppRouter'

export const CalendarApp = () => {

  return (
    <>
      <AppRouter />
    </>
  )
}
```

Directamente no es muy conveniente apuntar en la aplicación de react directamente al path del archivo, porque puede ser que yo después tenga algunos validadores, tenga otras rutas o tengo más directorios o más archivos dentro del router y esto puede ir creciendo mucho. Entonces voy a crear un archivo en donde sea posible para evitar tener muchas importaciones o exportaciones después.

Entonces vamos a crearnos dentro de `/router` el archivo se llamará `index.js` y ya puedo importarlo directamente de AppRouter. Esto para evitar tener un montón de importaciones, a medida que nuestra aplicación va creciendo

```js

export * from './AppRouter'

```

Haremos lo mismo dentro de la carpeta `/auth` ahí crearemos un archivo `index.js` y haremos lo siguiente
```js

export * from './pages/LoginPage';// importar todo lo de login 
//es decir, cada vez que vayamos creando páginas, vamos a agregarlas a este archivo index.js

```

y haremos lo mismo dentro de la carpeta de `calendar` creando siempre el archivo `index.js`
```js

export * from './pages/CalendarPage';

```

y modificamos la importación de AppRouter...
```jsx
import { AppRouter } from './router'

export const CalendarApp = () => {

  return (
    <>
      <AppRouter />
    </>
  )
}

```

Ahora ya podemos ver que todo está renderizado.

## Utilizando funcionalidad propia de React Router Dom
Nos dirigimos hacia `AppRouter.jsx` y hacemos lo siguiente
```jsx
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';

// dentro de nuestro componente debemos tener algún tipo de validación

export const AppRouter = () => {

  const authStatus = 'not-authenticated';// esto sería temporal

  return (
    <Routes>
      {
        // TODO: {
        //   ( authStatus === 'not-authenticated' )
        // }
      }
      <Route path='/auth/*' element={ <LoginPage /> } />
    </Routes>
  )
}
```

Luego, definiremos nuestro `<BrowserRouter>` en este caso, dentro de `CalendarApp.jsx`

```jsx
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

export const CalendarApp = () => {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

```

Ahora vemos en el navegador que si colocamos "http://localhost:5173/auth" me lleva a LoginPage, y eso es bueno, ya tendríamos implementada nuestra primera ruta, pero crearé otra que sea cualquier ruta que no sea la que ya tenemos

```jsx
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';//si podemos ver sólo tenemos un archivo
import { CalendarPage } from '../calendar';

// dentro de nuestro componente debemos tener algún tipo de validación

export const AppRouter = () => {

  const authStatus = 'not-authenticated';// esto sería temporal

  return (
    <Routes>
      {
        // TODO: {
        //   ( authStatus === 'not-authenticated' )
        // }
      }
      <Route path='/auth/*' element={ <LoginPage /> } />
      <Route path='*' element={ <CalendarPage /> } />
    </Routes>
  )
}
```

En este caso, ahora sí podemos aplicar la condición, lo hago de esta manera porque si no estuviera autenticado yo estoy apuntando únicamente al *slash auth* entonces lo que voy a hacer aquí si no está autenticado es redireccionar hacia la última ruta que sería `<Route path='*' element={ <Navigate to='/auth/login' /> } />`

```jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {

  const authStatus = 'not-authenticated';// esto sería temporal
   
  return (
    <Routes>
      {
        ( authStatus === 'not-authenticated' )
            ? <Route path='/auth/*' element={ <LoginPage /> } />
            : <Route path='*' element={ <CalendarPage /> } />//si yo estoy autenticado, esta ruta manejaría cualquier otra excepción
      } 
      <Route path='*' element={ <Navigate to='/auth/login' /> } />
    </Routes>
  )
}

```
Esto sirve para evitar que nuestro usuario llegue a una ruta que no existe. 
Probando en el navegador si ponemos cualquier path, veremos que nos redirecciona al login, porque no estamos autenticados

En caso que sí estuvieramos autenticados, esa ruta me llevaría al CalendarPage.

Con esto, tenemos un sistema de rutas y de autenticación, básico. Pero funcionaría en la vida real, aunque si quisieran se puede implementar rutas privadas y públicas, pero ese es otro tema, por ahora llegamos hasta acá.

En la siguiente clase, se realizará el diseño del login, y un navbar para medio manejar el estado de la autenticación del usuario.