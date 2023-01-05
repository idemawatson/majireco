import axios from 'axios'
// eslint-disable-next-line
import { FallbackProps } from 'react-error-boundary'
import BaseErrorBoundary from '@/components/organisms/error/BaseErrorBaundary'

export const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  if (axios.isAxiosError(error) && error.response?.data?.statusCode === 404) {
    return <BaseErrorBoundary statusCode={404} message='対局が存在しません。URLが不正です。' />
  } else {
    throw error
  }
}
