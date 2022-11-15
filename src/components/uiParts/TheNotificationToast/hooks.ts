import { AlertColor } from '@mui/material'
import useSWR from 'swr'

type Props = {
  visible: boolean
  severity: AlertColor | undefined
  message: string | undefined
}

const useNotificationSWR = (key: string, initialData: Props): [Props, (state: Props) => void] => {
  const { data: state, mutate: setState } = useSWR(key, null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as Props, setState]
}

export const useNotification = () => {
  const initialState = {
    visible: false,
    severity: undefined,
    message: undefined,
  }
  const [notification, setNotification] = useNotificationSWR('notification', initialState)

  const showError = (message: string) => {
    showNotification('error', message)
  }
  const showWarning = (message: string) => {
    showNotification('warning', message)
  }
  const showInfo = (message: string) => {
    showNotification('info', message)
  }
  const showSuccess = (message: string) => {
    showNotification('success', message)
  }
  const showNotification = (severity: AlertColor | undefined, message: string) => {
    setNotification({ visible: true, severity, message })
    setTimeout(hideNotification, 3000)
  }
  const hideNotification = () => {
    setNotification(initialState)
  }

  return {
    notification,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    hideNotification,
    useNotification,
  }
}
