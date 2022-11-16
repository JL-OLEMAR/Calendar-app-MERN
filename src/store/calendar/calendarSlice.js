import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Boss birthday',
  notes: 'The cake must be bought',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'test1'
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((evt) => {
        if (evt._id === payload._id) {
          return payload
        }

        return evt
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent === null) return

      state.events = state.events.filter(
        (evt) => evt._id !== state.activeEvent._id
      )

      state.activeEvent = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } =
  calendarSlice.actions
