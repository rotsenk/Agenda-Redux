# Inicio y Configuración de Agenda Personal
## Crear la plantilla
- Crear la app `npm init vite@latest agenda-redux -- --template react`
- acceder a la carpeta cd `agenda-redux`
- instalar dependencias `npm install`
- instalar eslinter `npm install standard -D`


ir a package.json y configurar debajo de "devDependencies"
```json
"eslintConfig":{
    "extends": ["standard"]
  }
```

- ejecutar app npm run dev y verificar que corra bien

Procederemos a eliminar archivos que no necesitaremos para dejar nuestra App limpia...
Sólo necesito por ahora que se renderice el Componente que teníamos como `App.jsx` podemos cambiar su nombre a `CalendarApp.jsx`
```jsx
function CalendarApp() {

  return (
    <>
      <h1>Hello World desde CalendarApp</h1>
    </>
  )
}

export default CalendarApp
```

- Trabajaremos con React Router Dom v6
https://reactrouter.com/en/main

- Instalar React Router Dom `npm install react-router-dom -E`

- Después verificar si se instaló en el `package.json`

```json
"dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3"
  },
```

- Luego, estos enlaces nos van a servir porque trabajaremos con Bootstrap
https://getbootstrap.com/docs/5.2/getting-started/introduction/

Tomamos la CDN, y la pegamos en `index.html` justo debajo del *title*, donde dice "Vite + React" y cambiamos el nombre a "Agenda Personal"

Cambiar el nombre del archivo "index.css" por "styles.css"

Con esto, ya podemos ver que tenemos instalado bootstrap, y react router dom.

Podemos empezar a trabajar!!!