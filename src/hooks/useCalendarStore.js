import { useDispatch, useSelector } from 'react-redux'

import { calendarApi } from '../api'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent
} from '../store/calendar'
import {
  convertEventsToDateEvents,
  setErrorToast,
  setSuccessToast
} from '../helpers'

export function useCalendarStore() {
  const { user } = useSelector((state) => state.auth)
  const { activeEvent, events } = useSelector((state) => state.calendar)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvt) => {
    dispatch(onSetActiveEvent(calendarEvt))
  }

  const startSavingEvent = async (calendarEvt) => {
    try {
      // Updating
      if (calendarEvt.id) {
        await calendarApi.put(`/events/${calendarEvt.id}`, calendarEvt)
        dispatch(onUpdateEvent({ ...calendarEvt, user }))
        return
      }

      // Creating
      const { data } = await calendarApi.post('/events', calendarEvt)
      dispatch(onAddNewEvent({ ...calendarEvt, id: data.event.id, user }))
    } catch (error) {
      setErrorToast(error.response.data.msg)
    }
  }

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
      setSuccessToast('Deleted event.')
    } catch (error) {
      setErrorToast(error.response.data.msg)
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('Error loading events')
      console.log(error)
    }
  }

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent
  }
}
