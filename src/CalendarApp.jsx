import { Provider } from 'react-redux'

import { AppRouter } from './components/router'
import { store } from './store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
