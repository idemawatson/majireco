import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/templates/game/[gameId]/errorBoundary'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'
import { Loading } from './loading'
import Presenter from './presenter'

const Page: FC = () => {
  const submitForm = (data: ICreateGameForm) => {}
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Presenter submitForm={submitForm}></Presenter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Page
