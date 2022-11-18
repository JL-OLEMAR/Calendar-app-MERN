import { useSelector, useDispatch } from 'react-redux'

import { calendarApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth'

export const useAuthStore = () => {
  const { errorMessage, status, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth', { email, password })
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      dispatch(onLogout('Incorrect credentials'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password
      })

      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  return {
    errorMessage,
    status,
    user,
    startLogin,
    startRegister
  }
}
