import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/es'

import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading
} from '../../actions/events.js'
import { uiOpenModal } from '../../actions/ui.js'
import { messages } from '../../helpers'
import { AddNewFab, DeleteEventFab, Navbar } from '../ui'

import { CalendarEvent } from './CalendarEvent.jsx'
import { CalendarModal } from './CalendarModal.jsx'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { uid } = useSelector((state) => state.auth)

  const [lastView, setLastView] = useState(
    window.localStorage.getItem('lastView') || 'month'
  )

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])

  const onDoubleClick = (_e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onSelectSlot = (_e) => {
    dispatch(eventClearActiveEvent())
  }

  const onViewChange = (e) => {
    setLastView(e)
    window.localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, _start, _end, _isSeleced) => {
    const style = {
      backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
      borderRadius: '0px',
      color: 'white',
      display: 'block',
      opacity: 0.8
    }

    return { style }
  }

  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        selectable
        components={{
          event: CalendarEvent
        }}
        endAccessor='end'
        eventPropGetter={eventStyleGetter}
        events={events}
        localizer={localizer}
        messages={messages}
        startAccessor='start'
        view={lastView}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        onView={onViewChange}
      />

      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  )
}
