export function Navbar() {
  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt' />
        <span className='ps-2'>Testing</span>
      </span>

      <button className='btn btn-outline-danger'>
        <i className='fas fa-sign-out-alt' />
        <span className='ps-2'>Leave</span>
      </button>
    </div>
  )
}
