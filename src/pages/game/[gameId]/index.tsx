import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import GameIdPresenter from '../../../components/templates/game/[gameId]/presenter'
import { MainLayout } from '@/components/layout/MainLayout'
import { ErrorFallback } from '@/components/templates/game/[gameId]/errorBoundary'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'

const Page: FC = () => {
  const submitForm = (data: ICreateGameForm) => {}
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <GameIdPresenter submitForm={submitForm}></GameIdPresenter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
