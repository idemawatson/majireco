import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Presenter from '@/components/templates/game/join/[gameId]/presenter'
import { ErrorFallback } from '@/components/templates/game/join/[gameId]/errorBoundary'
import { Loading } from './skeleton'

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
