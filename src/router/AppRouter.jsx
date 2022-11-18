import { Navigate, Route, Routes } from 'react-router-dom'

import { Auth } from '../auth'
import { Calendar } from '../calendar'

export function AppRouter() {
  const authStatus = 'not-authenticated'

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path='/auth/*' element={<Auth />} />
      ) : (
        <Route path='/*' element={<Calendar />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
