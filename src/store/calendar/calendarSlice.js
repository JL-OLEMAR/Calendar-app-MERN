import { createSlice } from '@reduxjs/toolkit'
// import { addHours } from 'date-fns'
// const tempEvent = {
//   id: new Date().getTime(),
//   title: '',
//   notes: '',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     id: '123',
//     name: 'test1'
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    // events: [ tempEvent ],
    events: [],
    activeEvent: null,
    isLoadingEvents: true
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false
      // state.events = payload
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id)
        exists || state.events.push(event)
      })
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((evt) => {
        if (evt.id === payload.id) {
          return payload
        }

        return evt
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent === null) return

      state.events = state.events.filter(
        (evt) => evt.id !== state.activeEvent.id
      )

      state.activeEvent = null
    },
    onClearEvents: (state) => {
      state.activeEvent = null
      state.events = []
      state.isLoadingEvents = true
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onClearEvents,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent
} = calendarSlice.actions
