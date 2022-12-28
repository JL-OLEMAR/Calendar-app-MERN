import { beforeEach, expect, describe, jest, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import { useAuthStore } from '../../src/hooks/useAuthStore.js'
import { AppRouter } from '../../src/router/AppRouter.jsx'

jest.mock('../../src/hooks/useAuthStore.js')

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
})
