import Swal from 'sweetalert2'

import { fetchConToken, fetchSinToken } from '../helpers'
import { types } from '../types'

import { eventLogout } from './events.js'

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST')
    const body = await resp.json()

    if (body.ok) {
      window.localStorage.setItem('token', body.token)
      window.localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/new',
      { email, password, name },
      'POST'
    )
    const body = await resp.json()

    if (body.ok) {
      window.localStorage.setItem('token', body.token)
      window.localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew')
    const body = await resp.json()

    if (body.ok) {
      window.localStorage.setItem('token', body.token)
      window.localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      )
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(eventLogout())
    dispatch(logout())
  }
}

const logout = () => ({ type: types.authLogout })
