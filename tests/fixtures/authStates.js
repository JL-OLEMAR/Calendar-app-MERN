export const initialState = {
  status: 'checking', // 'authenticated', 'not-authenticated'
  user: {},
  errorMessage: undefined
}

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: 'abc',
    name: 'Ole'
  },
  errorMessage: undefined
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined
}
