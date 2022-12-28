import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../hooks'
import { Auth } from '../auth'
import { Calendar } from '../calendar'

export function AppRouter () {
  const { checkAuthToken, status } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <h3>Loading...</h3>
  }

  return (
    <Routes>
      {status === 'not-authenticated'
        ? (
          <>
            <Route path='/auth/*' element={<Auth />} />
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>
          )
        : (
          <>
            <Route path='/' element={<Calendar />} />
            <Route path='/*' element={<Navigate to='/' />} />
          </>
          )}
    </Routes>
  )
}
