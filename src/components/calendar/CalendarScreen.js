import moment from 'moment'
import 'moment/locale/es'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../accions/events'
import { uiOpenModal } from '../../accions/ui'
import { messages } from '../../helpers/calendar-messages-es'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { uid } = useSelector(state => state.auth)
  // TODO: leer del store, los eventos

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month') // eslint-disable-line

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e) // eslint-disable-line
  }

  const eventStyleGetter = (event, start, end, isSeleced) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      color: 'white',
      display: 'block',
      opacity: 0.8
    }

    return {
      style
    }
  }

  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true} // eslint-disable-line
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      {
        (activeEvent) && <DeleteEventFab />
      }
      <CalendarModal />
    </div>
  )
}
