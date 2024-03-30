# LoginScreen y Navbar

se realizará el diseño del login, y un navbar para que nos sirva para medio manejar el estado de la autenticación del usuario, y si ya estamos autenticados entonces que nos sirva para cerrar sesión y saber qué usuario estamos usando.

En este enlace se encuentra el CSS y el diseño del Login: gist.github.com/Klerith/74a0c4426599f3bc25b7f4e8d95b6a7f

También está el enlace a la cdn de Font Awesome: https://cdnjs.com/libraries/font-awesome este es para poner íconos rápidamente en nuestra aplicación

https://cdnjs.com/libraries/font-awesome/6.5.1

Usaremos la versión 6.5.1, copiamos y pegamos en el `index.html` debajo del enlace a la cdn de `bootstrap` 

En esta url podemos explorar los íconos: https://fontawesome.com/icons

Nos dirigimos a `LoginPage.jsx`
```jsx
import './LoginPage.css';//llamar al css exactamente igual que el Functional Component

export const LoginPage = () => {
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
```

Ahora el CSS

```css
.login-container{
    margin-top: 5%;
}
.login-form-1{
    border-radius: 5px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    padding: 5%;
}
.login-form-1 h3{
    text-align: center;
    color: #333;
}
.login-form-2{
    border-radius: 5px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    padding: 5%;
    background: #0062cc;
}
.login-form-2 h3{
    text-align: center;
    color: #fff;
}
.login-container form{
    padding: 10%;
}
.btnSubmit
{
    /* width: 50%; */ /* por si queremos el botón a la mitad */
    width: 100%; /* para que el botón se haga ancho */
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}
.login-form-1 .btnSubmit{
    color: #fff;
    background-color: #0062cc;
}
.login-form-2 .btnSubmit{
    background-color: #fff;
    color: #0062cc;
}
.login-form-2 .ForgetPwd{
    color: #fff;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .ForgetPwd{
    color: #0062cc;
    font-weight: 600;
    text-decoration: none;
}
```



Lo que nosotros tenemos en la pantalla de login que también tiene el registro ya tiene el botón tiene registrar cuenta, se mira bien. ustedes pueden hacer mayores cosas con el diseño si gustan.

Si yo recargo navegador web ahí está es un login relativamente sencillo no es la gran cosa, pero funciona.
Este template nos funciona muy bien.

Bien, ahora nos dirigimos hacia `AppRouter.jsx` y colocamos que estamos *authenticated* y ya nos muestra el CalendarPage en el navegador.

Empecemos a trabajar también con un Navbar, este lo voy a crear dentro de `/calendar` porque es un componente que solo se va a ver si estoy autenticado y es parte de mi aplicación del calendario entonces creamos `/components` y dentro de componentes voy a crearme el mapa `Navbar.jsx`

```jsx
export const Navbar = () => {
  return (
    <div>
      Soy el Navbar
    </div>
  )
}
```

luego nos vamos hacia el `indesx.js` de `/calendar` y agregaremos la exportación a este 

```jsx
export * from './components/Navbar';

export * from './pages/CalendarPage';
```

Ahora nos vamos hacia `CalendarPage.jsx` y hacemos esto:
```jsx
import { Navbar } from "../";//hacemos  esta importación porque ya tenemos nuestro archivo que contiene todas las importaciones

export const CalendarPage = () => {
  return (
    <>
      <Navbar />
    </>
  )
}
```

Ya podemos ver en el navegador que nos muestra la interfaz del navbar, pero tenemos que modificar `Navbar.jsx`


Con esto, tenemos nuestro Navbar, un botón de salir, un nombre de usuario "conectado", que eso lo vamos a leer nosotros después de hacer una modificación, ya vamos a ver cómo hacemos más adelante, tenemos un icono por cada uno, y en teoría esto es lo que quería hacer por esta sección.