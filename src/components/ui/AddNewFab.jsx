import { useDispatch } from 'react-redux'

import { uiOpenModal } from '../../actions/ui.js'

export const AddNewFab = () => {
  const dispatch = useDispatch()

  const handleCLickNew = () => {
    dispatch(uiOpenModal())
  }

  return (
    <button className='btn btn-primary fab' onClick={handleCLickNew}>
      <i className='fas fa-plus' />
    </button>
  )
}
