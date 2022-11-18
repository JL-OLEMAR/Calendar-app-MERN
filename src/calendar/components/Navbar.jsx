import { useAuthStore } from '../../hooks'

export function Navbar() {
  const { startLogout, user } = useAuthStore()

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt' />
        <span className='ps-2'>{user.name}</span>
      </span>

      <button className='btn btn-outline-danger' onClick={startLogout}>
        <i className='fas fa-sign-out-alt' />
        <span className='ps-2'>Leave</span>
      </button>
    </div>
  )
}
