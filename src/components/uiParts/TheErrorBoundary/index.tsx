// eslint-disable-next-line
import { useRouter } from 'next/router'
import { FallbackProps } from 'react-error-boundary'

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const router = useRouter()
  router.push('/500')
  return <div role='alert'></div>
}
