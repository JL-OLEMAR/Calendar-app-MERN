import { useCalendarStore } from '../../hooks'
import './fabAddNew.css'

export function FabDelete () {
  const { hasEventSelected, startDeleteEvent } = useCalendarStore()

  const handleDeleteEvt = () => {
    startDeleteEvent()
  }

  return (
    <button
      className='btn btn-danger fab-danger'
      style={{ display: hasEventSelected ? '' : 'none' }}
      type='button'
      onClick={handleDeleteEvt}
    >
      <i className='fas fa-trash-alt' />
    </button>
  )
}
