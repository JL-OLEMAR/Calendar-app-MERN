import Swal from 'sweetalert2'

import { fetchConToken, prepareEvents } from '../helpers'
import { types } from '../types'

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth

    try {
      /* parametro ,payload o data, method */
      const resp = await fetchConToken('events', event, 'POST')
      const body = await resp.json()

      if (body.ok) {
        event.id = body.evento.id
        event.user = {
          _id: uid,
          name
        }
        dispatch(eventAddNew(event))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const rest = await fetchConToken(`events/${event.id}`, event, 'PUT')
      const body = await rest.json()

      if (body.ok) {
        dispatch(eventUpdated(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventStartDeleted = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent

    try {
      const rest = await fetchConToken(`events/${id}`, {}, 'DELETE')
      const body = await rest.json()

      if (body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventDeleted = () => ({ type: types.eventDeleted })

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const rest = await fetchConToken('events')
      const body = await rest.json()

      const events = prepareEvents(body.eventos)

      dispatch(eventLoaded(events))
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})

export const eventLogout = () => ({
  type: types.eventLogout
})
