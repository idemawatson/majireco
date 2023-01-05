import { useRouter } from 'next/router'
// eslint-disable-next-line
import { FallbackProps } from 'react-error-boundary'

export const ErrorFallback: React.FC<FallbackProps> = ({}) => {
  const router = useRouter()
  router.push('/500')
  return <div role='alert'></div>
}
