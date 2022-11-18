import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth'
import { calendarSlice } from './calendar'
import { uiSlice } from './ui'

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
