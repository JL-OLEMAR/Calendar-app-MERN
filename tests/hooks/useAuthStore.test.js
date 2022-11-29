import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { act, renderHook, waitFor } from '@testing-library/react'

import { calendarApi } from '../../src/api'
import { authSlice } from '../../src/store/auth'
import { useAuthStore } from '../../src/hooks'
import {
  initialState as initialAuthState,
  notAuthenticatedState,
  testUserCredentials
} from '../fixtures'

// Mock the store of authSlice
const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}
describe('Tests in the useAuthStore hook', () => {
  beforeEach(() => globalThis.localStorage.clear())

  test('should return the default values', () => {
    // Here mock the initialState 👇
    const mockStore = getMockStore({ ...initialAuthState })

    const { result } = renderHook(() => useAuthStore(), {
      // 👇 Here wrapper the hook for provider the mocked store)
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function)
    })
  })

  test('startLogin should login correctly', async () => {
    // Here mock the initialState 👇
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      // 👇 Here wrapper the hook for provider the mocked store)
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.startLogin(testUserCredentials)
    })

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'TestUser', uid: '637d3a415be35345a426b50d' },
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function)
    })

    expect(globalThis.localStorage.getItem('token')).toEqual(expect.any(String))
    expect(globalThis.localStorage.getItem('token-init-date')).toEqual(
      expect.any(String)
    )
  })

  test('startLogin should fail authentication', async () => {
    // Here mock the initialState 👇
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      // 👇 Here wrapper the hook for provider the mocked store)
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.startLogin({
        email: 'djfs@fs.com',
        password: '123453546'
      })
    })

    const { errorMessage, status, user } = result.current

    expect(globalThis.localStorage.getItem('token')).toBeNull()
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Incorrect credentials',
      status: 'not-authenticated',
      user: {}
    })

    await waitFor(() => expect(result.current.errorMessage).toBeUndefined())
  })

  test('startRegister should create a user', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    // Partial mock to the api, to register a user
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '53646839456734',
        name: 'NewUserForTests',
        token: 'Any-Token'
      }
    })

    await act(async () => {
      // startRegister will return the response from the spy,
      // And will not create the user in the database.
      await result.current.startRegister({
        email: 'djfs@fs.com',
        password: '123453546',
        name: 'newUser'
      })
    })

    const { errorMessage, status, user } = result.current

    // expect(globalThis.localStorage.getItem('token')).toBeNull()
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'NewUserForTests', uid: '53646839456734' }
    })

    // Reset spy
    spy.mockRestore()
  })

  test('startRegister should fail the creation', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.startRegister(testUserCredentials)
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'User exists with that email',
      status: 'not-authenticated',
      user: {}
    })
  })

  test('checkAuthToken should fail if there is no token', async () => {
    const mockStore = getMockStore({ ...initialAuthState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    })
  })

  test('checkAuthToken should authenticate the user if there is a token', async () => {
    const { data } = await calendarApi.post('/auth', testUserCredentials)
    globalThis.localStorage.setItem('token', data.token)

    const mockStore = getMockStore({ ...initialAuthState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'TestUser', uid: '637d3a415be35345a426b50d' }
    })
  })
})
