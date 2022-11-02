export const CalendarEvent = ({ event }) => {
  const { title, user } = event

  return (
    <div>
      <strong>{title}</strong>
      <em> - {user.name}</em>
    </div>
  )
}
