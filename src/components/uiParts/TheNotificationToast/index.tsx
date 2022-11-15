import { Alert } from '@mui/material'
import { FC } from 'react'
import { useNotification } from './hooks'

export const TheNotificationToast: FC = () => {
  const { notification } = useNotification()
  if (notification.visible) {
    return (
      <>
        <Alert variant='filled' severity={notification.severity}>
          {notification.message}
        </Alert>
      </>
    )
  } else return <></>
}
