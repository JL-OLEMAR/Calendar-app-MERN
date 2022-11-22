import { useSelector, useDispatch } from 'react-redux'

import { calendarApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth'
import { onClearEvents } from '../store/calendar'

export const useAuthStore = () => {
  const { errorMessage, status, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth', { email, password })
      const { name, token, uid } = data

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name, uid }))
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
      const { name: nameData, token, uid } = data

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: nameData, uid }))
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = window.localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = await calendarApi.get('/auth/renew')
      const { name, token, uid } = data

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name, uid }))
    } catch (error) {
      window.localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    window.localStorage.clear()
    dispatch(onClearEvents())
    dispatch(onLogout())
  }

  return {
    errorMessage,
    status,
    user,
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister
  }
}
