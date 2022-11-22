import { useDispatch, useSelector } from 'react-redux'

import { calendarApi } from '../api'
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../store/calendar'

export function useCalendarStore() {
  const { user } = useSelector((state) => state.auth)
  const { activeEvent, events } = useSelector((state) => state.calendar)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvt) => {
    dispatch(onSetActiveEvent(calendarEvt))
  }

  const startSavingEvent = async (calendarEvt) => {
    if (calendarEvt._id) {
      // Updating
      dispatch(onUpdateEvent({ ...calendarEvt }))
    } else {
      // Creating
      const { data } = await calendarApi.post('/events', calendarEvt)
      dispatch(onAddNewEvent({ ...calendarEvt, id: data.event.id, user }))
    }
  }

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent())
  }

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startDeleteEvent,
    startSavingEvent
  }
}
