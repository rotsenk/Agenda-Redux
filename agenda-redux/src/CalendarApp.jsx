import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider } from 'react-redux'; // importamos el Provider
import { store } from './store';// importamos el store

export const CalendarApp = () => {

  return (
    <Provider store={ store } >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
