import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store' // cuando se usa el localStorage
import thunk from 'redux-thunk' // func que trae otra func
import Swal from 'sweetalert2'
import { startChecking, startLogin, startRegister } from '../../actions/auth'
import * as fetchModule from '../../helpers/fetch'
import { types } from '../../types/types'

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middleware = [thunk]
const mockStore = configureStore(middleware)

const initState = {}
let store = mockStore(initState)

let token = ''

describe('Pruebas en las acciones Auth', () => {
  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('startLogin correcto', async () => {
    Storage.prototype.setItem = jest.fn() // para el localStorage

    await store.dispatch(startLogin('fernando@gmail.com', '123456'))
    const actions = store.getActions()

    // comprobar el login sea correcto
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })

    // comprobar el localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))

    // comprobar el tiempo del localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    token = localStorage.setItem.mock.calls[0][1]
    // console.log(localStorage.setItem.mock.calls[0][1])
  })

  test('startLogin incorrecto', async () => {
    await store.dispatch(startLogin('fernando@gmail.com', '123456789'))
    let actions = store.getActions()

    // comprobar que el login sea incorrecto
    expect(actions).toEqual([])

    // comprobar el error del login, (Password incorrecto)
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error')
    await store.dispatch(startLogin('fernando123@gmail.com', '123456'))
    actions = store.getActions()

    // comprobar el error del login, (Email incorrecto)
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario no existe con ese email', 'error')
  })

  test('startRegister correcto', async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json () {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC123ABC123'
        }
      }
    }))

    await store.dispatch(startRegister('test@test.com', '123456', 'test'))
    const actions = store.getActions()

    // Registro correcto
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos'
      }
    })

    // comprobar el localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123')

    // comprobar el tiempo del localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))
  })

  test('startChecking correcto ', async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json () {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC123ABC123'
        }
      }
    }))

    await store.dispatch(startChecking())
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos'
      }
    })

    // localStorage aya sido llamado
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123')
  })
})
