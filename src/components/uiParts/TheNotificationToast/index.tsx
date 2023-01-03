import { Alert, Snackbar } from '@mui/material'
import { FC } from 'react'
import { useNotification } from './hooks'

export const TheNotificationToast: FC = () => {
  const { notification } = useNotification()
  return (
    <>
      <Snackbar
        open={notification.visible}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant='filled' severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}
