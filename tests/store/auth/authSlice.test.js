import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout
} from '../../../src/store/auth'
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
  testUserCredentials
} from '../../fixtures'

describe('Tests in authSlice', () => {
  test('should return the initialState', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('the status should be in checking', () => {
    const state = authSlice.reducer(authenticatedState, onChecking())

    expect(state.status).toBe('checking')
  })

  test('should login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    })
  })

  test('should logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  })

  test('should logout with errorMessage', () => {
    const errorMessage = 'Incorrect credentials'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

    expect(state.errorMessage).toBe(errorMessage)
  })

  test('should clean up the errorMessage', () => {
    const errorMessage = 'Incorrect credentials'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage())

    expect(newState.errorMessage).toBeUndefined()
    expect(newState).toEqual(notAuthenticatedState)
  })
})
