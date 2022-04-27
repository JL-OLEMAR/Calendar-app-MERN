import { useDispatch } from 'react-redux'

import { eventStartDeleted } from '../../actions/events'

export const DeleteEventFab = () => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(eventStartDeleted())
  }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
      <i className='fas fa-trash' />
      <span> Borrar evento </span>
    </button>
  )
}
