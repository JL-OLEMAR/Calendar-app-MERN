import { combineReducers } from 'redux'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
  ui: uiReducer
  // todo: AuthReducer
  // todo: CalendarReducer
})
