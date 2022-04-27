import { Provider } from 'react-redux'

import { AppRouter } from './components/router/AppRouter'
import { store } from './store/store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
