import moment from 'moment'
import 'moment/locale/es'
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../accions/ui'
import { messages } from '../../helpers/calendar-messages-es'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [{
  title: 'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el pastel',
  user: {
    _id: '123',
    name: 'Olemar'
  }
}]

export const CalendarScreen = () => {
  const dispatch = useDispatch()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month') // eslint-disable-line

  const onDoubleClick = (e) => {
    // console.log(e)
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    console.log(e)
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e) // eslint-disable-line
  }

  const eventStyleGetter = (event, start, end, isSeleced) => {
    const style = {
      backgroundColor: '#367CF7',
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
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />

      <CalendarModal />
    </div>
  )
}
