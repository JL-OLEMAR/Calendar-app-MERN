import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

export function CalendarApp () {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
