import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '../auth'
import { Calendar } from '../calendar'

export function AppRouter() {
  const authStatus = 'authenticated'

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path='/auth/*' element={<Login />} />
      ) : (
        <Route path='/*' element={<Calendar />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
