// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { MainLayout } from '@/components/layout/MainLayout'
import { ErrorFallback } from '@/components/templates/[gameId]/errorBoundary'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import GameIdPresenter from '../../components/templates/[gameId]/presenter'

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
