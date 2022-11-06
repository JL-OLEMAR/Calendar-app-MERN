import { useState } from 'react'
import { Calendar as BigCalendar } from 'react-big-calendar'
import { ToastContainer } from 'react-toastify'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-toastify/dist/ReactToastify.css'

import { getMessagesES, localizer } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'
import { CalendarEvent, CalendarModal, Navbar } from '../'

export function Calendar () {
  const [lastView, setLastView] = useState(window.localStorage.getItem('lastView') || 'week')
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      borderRadius: 0,
      opacity: 0.8,
      backgroundColor: '#347CF7',
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

      <ToastContainer />
    </>
  )
}
