import { fetchConToken, fetchSinToken } from '../../helpers/fetch'

describe('Pruebas en el helper Fetch', () => { // eslint-disable-line
  let token = ''

  test('fetchSinToken debe de funcionar', async () => { // eslint-disable-line
    const resp = await fetchSinToken('auth', { email: 'fernando@gmail.com', password: '123456' }, 'POST')
    expect(resp instanceof Response).toBe(true) // eslint-disable-line

    const body = await resp.json()
    expect(body.ok).toBe(true) // eslint-disable-line
    token = body.token
  })

  test('fetchConToken debe de funcionar', async () => { // eslint-disable-line
    localStorage.setItem('token', token) // eslint-disable-line
    const resp = await fetchConToken('events/60334c72798ef8247fc34464', { }, 'DELETE')
    const body = await resp.json()
    expect(body.msg).toBe('Evento no existe por ese id') // eslint-disable-line
  })
})
