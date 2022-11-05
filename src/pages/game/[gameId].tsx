// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { MainLayout } from '@/components/layout/MainLayout'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC, Suspense } from 'react'
import Presenter from '../../components/templates/game/presenter'

const Page: FC = () => {
  const submitForm = (data: ICreateGameForm) => {}
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Presenter submitForm={submitForm}></Presenter>
      </Suspense>
    </>
  )
}

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
