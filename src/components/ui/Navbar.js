import { useDispatch, useSelector } from 'react-redux'
import { Offline, Online } from 'react-detect-offline'

import { startLogout } from '../../actions/auth'

export const Navbar = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>{name}</span>

      <Online>
        <span className='text-success'>Online</span>
      </Online>

      <Offline>
        <span className='text-danger'>
          Offline - Your requests will be saved
        </span>
      </Offline>

      <button className='btn btn-outline-danger' onClick={handleLogout}>
        <i className='fas fa-sign-out-alt' />
        <span> Salir</span>
      </button>
    </div>
  )
}
