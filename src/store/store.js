import { configureStore } from '@reduxjs/toolkit'
import { authSlice, calendarSlice, uiSlice } from './'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer
  },
  // So that it doesn't check, if the dates are serialized.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
