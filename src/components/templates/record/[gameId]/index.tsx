import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './errorBoundary'
import { Loading } from './loading'
import Presenter from './presenter'

const Page: FC = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Presenter></Presenter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Page
