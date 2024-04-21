import React from 'react'

interface MessageCardProps {
  message: string
  type?: 'success' | 'error' | 'info' // Optional message type
  onDismiss?: () => void // Optional callback for dismissing the card
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  type = 'success',
  onDismiss,
}) => {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss()
    }
  }

  return (
    <div
      className={`message-card message-card-${type}`}
      role="alert"
      aria-live="assertive"
    >
      <p>{message}</p>
      {onDismiss && (
        <button type="button" onClick={handleDismiss}>
          Dismiss
        </button>
      )}
    </div>
  )
}

export default MessageCard
