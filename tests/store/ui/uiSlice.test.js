import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice
} from '../../../src/store/ui/uiSlice.js'

describe('Tests in uiSlice', () => {
  test('should return the default state', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
  })

  test('should change the isDateModalOpen correctly', () => {
    let state = uiSlice.getInitialState()

    state = uiSlice.reducer(state, onOpenDateModal())
    expect(state.isDateModalOpen).toBeTruthy()

    state = uiSlice.reducer(state, onCloseDateModal())
    expect(state.isDateModalOpen).toBeFalsy()
  })
})
