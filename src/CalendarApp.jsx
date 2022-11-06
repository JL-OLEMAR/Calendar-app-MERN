import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppRouter } from './router'
import { store } from './store'

export function CalendarApp () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
