// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { MainLayout } from '@/components/layout/MainLayout'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import restClient from '@/libs/restClient'
import { CreateGameFormResponse, Form } from '@/types/forms/CreateGameForm'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Presenter from './presenter'

const Page: FC = () => {
  const { showLoading, hideLoading } = useLoading()
  const router = useRouter()
  const submitForm = async (data: Form) => {
    showLoading()
    const response = await restClient.put<Form, CreateGameFormResponse>('/game', data)
    hideLoading()
    router.push(`game/${response.data.id}`)
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
