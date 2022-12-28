import { expect, describe, test } from '@jest/globals'
import {
  calendarSlice,
  onAddNewEvent,
  onClearEvents,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent
} from '../../../src/store/calendar'
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initialStateEvents
} from '../../fixtures'

describe('Tests in calendarSlice', () => {
  test('should return the default initialState', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialStateEvents)
  })

  test('onSetActiveEvent should activate the event', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    )

    expect(state.activeEvent).toEqual(events[0])
  })

  test('onAddNewEvent should add an event', () => {
    const newEvent = {
      id: '3',
      notes: 'any note Secretary',
      title: "Secretary's birthday",
      start: new Date('2021-12-21 13:00:00'),
      end: new Date('2021-12-21 15:00:00')
    }

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    )

    expect(state.events).toEqual([...events, newEvent])
  })

  test('onUpdateEvent should update an event', () => {
    const updatedEvent = {
      id: '1',
      notes: 'Updated note 👨‍💻!!',
      title: "Boss's birthday!!!",
      start: new Date('2022-10-21 13:00:00'),
      end: new Date('2022-10-21 15:00:00')
    }

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    )

    expect(state.events).toContain(updatedEvent)
  })

  test('onDeleteEvent should delete the active event', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState, // ref events[0]
      onDeleteEvent()
    )

    expect(state.activeEvent).toBeNull()
    expect(state.events).not.toContain(events[0])
  })

  test('onLoadEvents should set the events', () => {
    const state = calendarSlice.reducer(
      initialStateEvents,
      onLoadEvents(events)
    )
    expect(state).toEqual(calendarWithEventsState)

    const newState = calendarSlice.reducer(state, onLoadEvents(events))
    expect(newState.events.length).toBe(events.length)
  })

  test('onClearEvents should clear the state', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onClearEvents()
    )
    expect(state).toEqual(initialStateEvents)
  })
})
