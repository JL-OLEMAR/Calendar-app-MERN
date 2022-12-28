import { beforeEach, expect, describe, jest, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore.js'

jest.mock('../../../src/hooks/useCalendarStore.js')

describe('Tests in <FabDelete />', () => {
  const mockStartDeleteEvent = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should display component correctly', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false
    })

    // Render component without the Provider, mock the hook
    render(<FabDelete />)
    const btnDelete = screen.getByLabelText('btn-delete')

    expect(btnDelete.classList).toContain('btn')
    expect(btnDelete.classList).toContain('btn-danger')
    expect(btnDelete.classList).toContain('fab-danger')
    expect(btnDelete.style.display).toBe('none')
  })

  test('should show the button if there is an active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true
    })

    // Render component without the Provider, mock the hook
    render(<FabDelete />)

    const btnDelete = screen.getByLabelText('btn-delete')
    expect(btnDelete.style.display).toBe('')
  })

  test('should call startDeleteEvent if there is an active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeleteEvent: mockStartDeleteEvent
    })

    // Render component without the Provider, mock the hook
    render(<FabDelete />)

    const btnDelete = screen.getByLabelText('btn-delete')
    fireEvent.click(btnDelete)

    expect(mockStartDeleteEvent).toHaveBeenCalled()
  })
})
