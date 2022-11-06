import { useDispatch, useSelector } from 'react-redux'
import { onSetActiveEvent } from '../store'

export function useCalendarStore () {
  const { activeEvent, events } = useSelector(state => state.calendar)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvt) => {
    dispatch(onSetActiveEvent(calendarEvt))
  }

  return {
    activeEvent,
    events,
    setActiveEvent
  }
}
