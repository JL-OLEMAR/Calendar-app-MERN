import { beforeEach, expect, describe, jest, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { useAuthStore } from '../../src/hooks/useAuthStore.js'
import { AppRouter } from '../../src/router/AppRouter.jsx'

jest.mock('../../src/hooks/useAuthStore.js')

// Mock whole Calendar Page with a h1 to avoid hooks
jest.mock('../../src/calendar', () => ({
  Calendar: () => <h1>CalendarPage</h1>
}))

describe('Tests in <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should show the loading screen and call the checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    })

    render(<AppRouter />)
    expect(screen.getByText('Loading...')).toBeTruthy()
    expect(mockCheckAuthToken).toHaveBeenCalled()
  })

  test('should show the login if not authenticated', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken
    })

    const { container } = render(
      <MemoryRouter initialEntries={['/auth2/dafsk/dfjasjf']}>
        {/* Redirect /auth/login */}
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('Sign In')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test.only('should show the calendar if authenticated', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken
    })

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('CalendarPage')).toBeTruthy()
  })
})
