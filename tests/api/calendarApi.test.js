import { expect, describe, test } from '@jest/globals'
import calendarApi from '../../src/api/calendarApi.js'

describe('Tests in calendarApi', () => {
  test('should have the default config', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_APP_API_URL)
  })

  test('should have the x-token in the header of all requests', async () => {
    const token = 'ABC-123-XYZ'
    globalThis.localStorage.setItem('token', token)
    const res = await calendarApi.get('/auth')

    expect(res.config.headers['x-token']).toBe(token)
  })
})
