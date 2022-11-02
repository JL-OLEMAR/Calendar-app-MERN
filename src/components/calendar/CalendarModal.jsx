import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'
import moment from 'moment'

import { uiCloseModal } from '../../actions/ui.js'
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate
} from '../../actions/events.js'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root')
}

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui)
  const { activeEvent } = useSelector((state) => state.calendar)
  const dispatch = useDispatch()

  const [dateStart, setDateStart] = useState(() => now.toDate())
  const [dateEnd, setDateEnd] = useState(() => nowPlus1.toDate())
  const [titleValid, setTitleValid] = useState(true)

  const [formValues, setFormValues] = useState(() => initEvent)

  const { notes, title, start, end } = formValues

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent) // actualiza
    } else {
      setFormValues(initEvent) // elimina
    }
  }, [activeEvent, setFormValues])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(eventClearActiveEvent())
    setFormValues(initEvent)
  }

  const handleStartDateChange = (e) => {
    setDateStart(e)
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const momentStart = moment(start)
    const momentEnd = moment(end)

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha fin debe de ser mayor a la fecha de inicio',
        'error'
      )
    }

    if (title.trim().length < 2) {
      return setTitleValid(false)
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues))
    } else {
      dispatch(eventStartAddNew(formValues))
    }

    setTitleValid(true)
    closeModal()
  }

  return (
    <Modal
      ariaHideApp={!process.env.NODE_ENV === 'test'}
      className='modal'
      closeTimeoutMS={200}
      isOpen={modalOpen}
      overlayClassName='modal-fondo'
      style={customStyles}
      onRequestClose={closeModal}
    >
      <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
      <hr />
      <form className='container' onSubmit={handleSubmitForm}>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className='form-control'
            format='dd/MM/yyyy HH:mm'
            name='start'
            required
            value={dateStart}
            onChange={handleStartDateChange}
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className='form-control'
            format='dd/MM/yyyy HH:mm'
            minDate={dateStart}
            name='end'
            required
            value={dateEnd}
            onChange={handleEndDateChange}
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            autoComplete='off'
            className={`form-control ${!titleValid && 'is-invalid'}`}
            name='title'
            placeholder='Título del evento'
            type='text'
            value={title}
            onChange={handleInputChange}
          />
          <small className='form-text text-muted' id='emailHelp'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group'>
          <textarea // eslint-disable-line
            className='form-control'
            name='notes'
            placeholder='Notas'
            rows='5'
            type='text'
            value={notes}
            onChange={handleInputChange}
          >
          </textarea>{' '}
          {/* eslint-disable-line */}
          <small className='form-text text-muted' id='emailHelp'>
            Información adicional
          </small>
        </div>

        <button className='btn btn-outline-primary btn-block' type='submit'>
          <i className='far fa-save' />
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
