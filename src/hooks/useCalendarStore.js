import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../store/calendar'

export function useCalendarStore() {
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
      dispatch(onAddNewEvent({ ...calendarEvt, _id: new Date().getTime() }))
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
