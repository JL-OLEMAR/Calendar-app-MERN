/* eslint-disable no-useless-return */
import { useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'
import { toast } from 'react-toastify'

import 'react-datepicker/dist/react-datepicker.css'
import './calendarModal.css'

// Change the language of the modal labels
registerLocale('es', es)

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

// Show modal at page height
Modal.setAppElement('#root')

const INITIAL_STATE = {
  title: 'test1',
  notes: 'Bla bla',
  start: new Date(),
  end: addHours(new Date(), 2)
}

export function CalendarModal () {
  const [isOpenModal, setIsOpenModal] = useState(true)
  const [formValues, setFormValues] = useState(INITIAL_STATE)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid'
  }, [formValues.title, formSubmitted])

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (evt, changing) => {
    setFormValues({
      ...formValues,
      [changing]: evt
    })
  }

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      toast.error('Wrong dates!', {
        theme: 'colored',
        position: toast.POSITION.BOTTOM_RIGHT
      })
      return
    }

    if (formValues.title.length <= 0) return

    console.log(formValues)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-background'
      closeTimeoutMS={200}
    >
      <h1 className='px-2'>New event</h1>
      <hr />

      <form className='container' onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label>Start date and time</label>
          <DatePicker
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
            selected={formValues.start}
            onChange={(evt) => onDateChanged(evt, 'start')}
          />
        </div>

        <div className='form-group mb-2'>
          <label>End date and time</label>
          <DatePicker
            className='form-control'
            minDate={formValues.start}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
            selected={formValues.end}
            onChange={(evt) => onDateChanged(evt, 'end')}
          />
        </div>
        <hr />

        <div className='form-group mb-2'>
          <label>Title and notes</label>
          <input
            type='text'
            className={`form-control ${titleClass}`}
            placeholder='Event title'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id='emailHelp' className='form-text text-muted'>Short description</small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notes'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChanged}
          />
          <small id='emailHelp' className='form-text text-muted'>Additional information</small>
        </div>

        <button
          className='btn btn-outline-primary btn-block'
          type='submit'
        >
          <i className='far fa-save' />
          <span className='ps-2'>Save</span>
        </button>
      </form>
    </Modal>
  )
}
