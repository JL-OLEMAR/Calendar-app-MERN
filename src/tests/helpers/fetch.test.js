/* global describe, test, expect */
import { fetchConToken, fetchSinToken } from '../../helpers/fetch'

describe('Pruebas en el helper Fetch', () => {
  let token = ''

  test('fetchSinToken debe de funcionar', async () => {
    const resp = await fetchSinToken(
      'auth',
      { email: 'test1@test.com', password: '123456' }, // → has to exist in the db
      'POST'
    )

    expect(resp instanceof Response).toBe(true) // eslint-disable-line no-undef
    const body = await resp.json()

    expect(body.ok).toBe(true)
    token = body.token
  })

  test('fetchConToken debe de funcionar', async () => {
    localStorage.setItem('token', token) // eslint-disable-line no-undef
    const resp = await fetchConToken(
      'events/60334c72798ef8247fc34464',
      {},
      'DELETE'
    )
    const body = await resp.json()

    expect(body.msg).toBe('Evento no existe por ese id')
  })
})
