import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { renderHook, act } from '@testing-library/react'

import { uiSlice } from '../../src/store/ui'
import { useUiStore } from '../../src/hooks'

// Mock the store of uiSlice
const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
}

describe('Tests in the useUiStore hook', () => {
  test('should return the default values', () => {
    // Here mock the initialState 👇
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook(() => useUiStore(), {
      // 👇 Here wrapper the hook for provider the mocked store
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function)
    })
  })

  test('openDateModal should put true in the isDateModalOpen state', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })
    const { openDateModal } = result.current

    // This is for the openDateModal function to update the isDateModalOpen state
    // Act === useEffect
    // Updates the state after rendering the component
    act(() => {
      openDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
  })

  test('closeDateModal should put false in the isDateModalOpen state', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    act(() => {
      result.current.closeDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()
  })
})
