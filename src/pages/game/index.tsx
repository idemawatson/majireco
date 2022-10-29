// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { MainLayout } from '@/components/layout/MainLayout'
import restClient from '@/libs/restClient'
import { Form } from '@/types/forms/CreateGameForm'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC } from 'react'
import Presenter from './presenter'

type CreateGameFormResponse = {
  id: string
}

const Page: FC = () => {
  const submitForm = async (data: Form) => {
    const response = await restClient
      .put<Form, CreateGameFormResponse>('/game', data)
      .catch((error) => console.error(error))
    console.log(response)
  }
  return (
    <>
      <Presenter submitForm={submitForm}></Presenter>
    </>
  )
}

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
