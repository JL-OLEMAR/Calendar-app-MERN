import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice, uiSlice } from './'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer
  },
  // So that it doesn't check, if the dates are serialized.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
