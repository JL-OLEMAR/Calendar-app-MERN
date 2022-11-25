export const events = [
  {
    id: '1',
    notes: 'any note',
    title: "Boss's birthday",
    start: new Date('2022-10-21 13:00:00'),
    end: new Date('2022-10-21 15:00:00')
  },
  {
    id: '2',
    notes: 'any note from New York',
    title: "Alice's birthday",
    start: new Date('2022-09-21 13:00:00'),
    end: new Date('2022-09-21 15:00:00')
  }
]

export const initialStateEvents = {
  activeEvent: null,
  events: [],
  isLoadingEvents: true
}

export const calendarWithEventsState = {
  activeEvent: null,
  events: [...events],
  isLoadingEvents: false
}

export const calendarWithActiveEventsState = {
  activeEvent: { ...events[0] },
  events: [...events],
  isLoadingEvents: false
}
