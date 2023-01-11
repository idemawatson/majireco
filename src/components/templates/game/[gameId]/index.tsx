import { useRouter } from 'next/router'
import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Loading } from './loading'
import Presenter from './presenter'
import { ErrorFallback } from '@/components/templates/game/[gameId]/errorBoundary'

const Page: FC = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Presenter />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Page
