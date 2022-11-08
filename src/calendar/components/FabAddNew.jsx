import { addHours } from 'date-fns'
import { useCalendarStore, useUiStore } from '../../hooks'
import './fabAddNew.css'

export function FabAddNew () {
  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'test1'
      }
    })
    openDateModal()
  }

  return (
    <button
      className='btn btn-primary fab'
      type='button'
      onClick={handleClickNew}
    >
      <i className='fas fa-plus' />
    </button>
  )
}
