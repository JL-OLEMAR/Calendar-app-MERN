import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState, useEffect } from 'react'
import { Calendar as BigCalendar } from 'react-big-calendar'

import { getMessagesES, localizer } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'

export function Calendar () {
  const [lastView, setLastView] = useState(
    window.localStorage.getItem('lastView') || 'week'
  )
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid

    const style = {
      borderRadius: 0,
      opacity: 0.8,
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      color: 'white'
    }

    return { style }
  }

  const onDoubleClick = (evt) => {
    openDateModal()
  }

  const onSelect = (evt) => {
    setActiveEvent(evt)
  }

  const onViewChanged = (evt) => {
    window.localStorage.setItem('lastView', evt)
    setLastView(evt)
  }

  return (
    <>
      <Navbar />

      <BigCalendar
        culture='es'
        endAccessor='end'
        startAccessor='start'
        events={events}
        defaultView={lastView}
        localizer={localizer}
        messages={getMessagesES()}
        components={{ event: CalendarEvent }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        style={{ height: 'calc(100vh - 80px)' }}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
