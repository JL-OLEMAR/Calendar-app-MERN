import { combineReducers } from 'redux'

import { authReducer } from './authReducer.js'
import { calendarReducer } from './calendarReducer.js'
import { uiReducer } from './uiReducer.js'

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer
})
