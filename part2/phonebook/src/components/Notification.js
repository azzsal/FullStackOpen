const Notification = ({ notification }) => {

  if (notification === null) {
    return null
  }

  return (
    <div className={`msg ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification